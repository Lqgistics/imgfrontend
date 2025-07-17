import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";

export default function Stats() {
const statistics = [
    { title: "Users", value: "1,200" },
    { title: "Sales", value: "$34,000" },
    { title: "Performance", value: "95%" },
];

return (
    <section className="w-[90%] sm:w-[80%] 2xl:w-[70%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 mb-12 mt-10">
        {statistics.map((stat, index) => (
            <Card key={index} className="w-full h-[10rem] bg-[#131327]/20 backdrop-blur-md border border-white/5 text-white">
                <CardHeader>
                    <CardTitle>{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{stat.value}</CardDescription>
                </CardContent>
            </Card>
        ))}
    </section>
);
}