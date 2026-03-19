const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/generate', async (req, res) => {
  const { workflow } = req.body;
  if (!workflow) return res.status(400).json({ error: 'workflow is required' });

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an expert on Snowflake Cortex Code Agent Skills. Given a data workflow description, generate a structured Agent Skill specification.

Respond ONLY with valid JSON, no markdown, no explanation. Use this exact schema:
{
  "name": "snake_case_skill_name",
  "display_name": "Human Readable Name",
  "description": "One sentence description of what this skill does",
  "trigger_conditions": ["array of natural language phrases that would invoke this skill"],
  "tools": [{"name": "tool_name", "description": "what it does"}],
  "parameters": [{"name": "param_name", "type": "string|integer|boolean|array", "description": "what it is", "required": true}],
  "behaviors": ["array of key behavior descriptions"],
  "example_prompts": ["3-4 example user prompts that would invoke this skill"],
  "outputs": ["list of what the skill returns or produces"],
  "evaluation_criteria": ["how to measure if the skill is working well"]
}

Workflow description: ${workflow}`
        }
      ]
    });

    const text = message.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const spec = JSON.parse(clean);
    res.json({ spec, raw: clean });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to generate skill spec' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
