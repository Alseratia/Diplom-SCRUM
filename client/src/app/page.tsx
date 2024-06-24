import { ProjectsTable } from "@/components/projects-table";
import { PageContent } from "./PageContent";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="px-12">
      <PageContent>
        <div className="h-full">
          <ProjectsTable />
        </div>
      </PageContent>
    </div>
  );
}
