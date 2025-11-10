 // src/app/page.js
import Board from "./components/Board";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-slate-950 text-slate-50">
      <h1 className="text-3xl font-bold mb-4">Helpdesk Board</h1>
      <Board />
    </main>
  );
}
