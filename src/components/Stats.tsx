"use client";
import { motion } from "framer-motion";

const stats = [
  { value: 50, label: "Projects Completed" },
  { value: 120, label: "Happy Clients" },
  { value: 4, label: "Years Experience" },
  { value: 15, label: "Awards Received" },
];

export default function Stats() {
  return (
    <section id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {stat.value}+
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{stat.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
