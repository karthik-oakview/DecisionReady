import { OPENAI_API_KEY } from "../openaiconfig";

export async function askDecisionReadyAI({

  question,

  location,

  disasterType,

  risk,

  riskScore,

  weather,

  alerts,

  noCar,

  kids,

  visitor,

}) {

  try {

    const systemPrompt = `
You are DecisionReady AI.

You are an emergency preparedness assistant for South Carolina.

Only answer questions about:

- severe weather
- evacuation
- shelters
- emergency planning
- safety
- preparedness

Never invent emergency alerts.

Never exaggerate risk.

Keep answers under 120 words.

Be calm, practical and reassuring.
`;

    const userPrompt = `
Current Situation

Location:
${location}

Emergency:
${disasterType}

Risk:
${risk}

Risk Score:
${riskScore}

Current Weather:
${weather}

Active Alerts:
${alerts}

No Car:
${noCar ? 'Yes' : 'No'}

Children:
${kids ? 'Yes' : 'No'}

Visitor:
${visitor ? 'Yes' : 'No'}

Question:

${question}
`;

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${OPENAI_API_KEY}`,

          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({

          model: 'gpt-4.1-mini',

          messages: [

            {
              role: 'system',
              content: systemPrompt,
            },

            {
              role: 'user',
              content: userPrompt,
            },

          ],

          temperature: 0.4,

          max_tokens: 250,

        }),
      }
    );

    const data = await response.json();

    return data.choices[0].message.content;

  } catch (error) {

    console.log(error);

    return 'Unable to contact DecisionReady AI.';
  }
}