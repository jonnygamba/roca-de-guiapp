export default function (url) {
  const headers = {
    Authorization: `Bearer ${process.env.NOTION_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2021-05-13",
  };

  return async function (input) {
    const data = parse(input);
    const resource = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    return await resource.json();
  };
}

function parse(asset) {
  return {
    parent: { database_id: asset.database },
    properties: {
      Name: {
        title: [{ text: { content: asset.timestamp.toString() } }],
      },
      Description: {
        rich_text: [{ text: { content: asset.description } }],
      },
      Url: {
        rich_text: [{ text: { content: asset.url } }],
      },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content: asset.initiator.imageUrl,
              },
            },
          ],
        },
      },
    ],
  };
}
