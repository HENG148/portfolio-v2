import EducationForm from "@/src/features/education/components/education-form";

export default function NewEducationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">New Education</h1>
      <EducationForm initial={null} />
    </div>
  )
}