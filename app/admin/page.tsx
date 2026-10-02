import type { Metadata } from "next";
import { ContentStudio } from "@/components/admin/content-studio";

export const metadata: Metadata = { title: "Content Studio — Portfolio" };
export default function AdminPage() { return <ContentStudio />; }
