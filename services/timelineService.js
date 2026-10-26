import { OPENAI_API_KEY } from "../openaiconfig";

export async function generateDecisionTimeline({

  location,
  disasterType,
  risk,
  riskScore,
  weather,
  noCar,
  kids,
  visitor,

}) {

  try {

    const prompt = `
You are DecisionReady AI.

Create a timeline for someone in South Carolina.

Location:
${location}

Emergency:
${disasterType}

Risk:
${risk}

Risk Score:
${riskScore}

Weather:
${weather}

No Car:
${noCar}

Children:
${kids}

Visitor:
${visitor}

Return ONLY this format:

Next 30 Minutes:
- item
- item

Next 6 Hours:
- item
- item

Next 24 Hours:
- item
- item

Maximum 150 words.
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          model: "gpt-4.1-mini",

          messages: [

            {
              role: "system",
              content:
                "You are a South Carolina emergency planning expert.",
            },

            {
              role: "user",
              content: prompt,
            },

          ],

          temperature: 0.3,

          max_tokens: 250,

        }),
      }
    );

    const data = await response.json();

    return data.choices[0].message.content;

  }

  catch (error) {

    console.log(error);

    return "Timeline unavailable.";

  }

}