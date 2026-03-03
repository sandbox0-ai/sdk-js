import { createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const templates = await client.templates.list();

  console.log(`templates: ${templates.length}`);
  for (const tpl of templates) {
    const display = tpl.spec?.displayName ?? "";
    console.log(
      `- template_id=${tpl.templateId} display=${display} scope=${tpl.scope}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
