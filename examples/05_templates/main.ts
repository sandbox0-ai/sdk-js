import { createClient } from "../_shared.ts";

async function main() {
  const client = createClient();
  const response = await client.apispec.templates.apiV1TemplatesGet();
  const templates = response.data?.templates ?? [];

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
