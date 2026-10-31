"use client";

const stats = [
  { value: 15, label: "Projects Completed" },
  { value: 10, label: "Happy Clients" },
  { value: 4, label: "Years Experience" },
  { value: 2, label: "Awards Received" },
];

export default function Stats() {
  return (
    <section id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          // CSS animation; "backwards" keeps each card hidden only during its own delay
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          className="glow-edge animate-in fade-in slide-in-from-bottom-4 duration-700 bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-gray-200 dark:border-white/10 rounded-xl p-6 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {stat.value}+
            </span>
          </div>
          <p className="text-gray-700 dark:text-foreground/80">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
