// src/app/api/tickets/route.js

export async function GET() {
  const tickets = [
    { id: 1, title: "Login issue", status: "Open", priority: "High" },
    { id: 2, title: "Update documentation", status: "In Progress", priority: "Medium" },
    { id: 3, title: "Password reset", status: "Closed", priority: "Low" },
  ];

  return Response.json(tickets);
}
