export default function ProjectSettingsPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  return <div className="px-12 py-6">Project settings {name}</div>;
}
