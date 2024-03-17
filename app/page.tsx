import ObjectDetection from "@/components/object-detection";

export default function Home() {
  return (
    <main className=" flex flex-col items-center p-8 min-h-screen">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl tracking-tighter md:px-6 text-center">Thief Detection Alarm</h1>
      <ObjectDetection />
    </main>
  );
}
