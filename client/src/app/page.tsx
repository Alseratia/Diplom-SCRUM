import { ProjectsTable } from "@/components/projects-table";
import { PageContent } from "./PageContent";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="px-12 py-6 text-red-400">
      <PageContent>
        <div className="h-full">
          <ProjectsTable />
        </div>
      </PageContent>
    </main>
  );
}
