import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Plans() {
  return (
    <section className="mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 mt-10 mb-20 ">
      <Card className="bg-[#131327]/20 backdrop-blur-md border border-white/5 text-white lg:h-[30rem] lg:w-[25rem] sm:w-[35rem] w-[21rem]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Basic Plan
          </CardTitle>
          <CardDescription className="text-gray-200">
            Perfect for personal use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-4xl font-bold text-white mt-[-1rem] mb-3 sm:mb-6">
            $9.99<span className="text-sm sm:text-lg font-normal">/month</span>
          </p>
          <ul className="space-y-2 sm:space-y-3 mb-2">
            {[
              "5GB Storage",
              "100GB Bandwidth",
              "Basic Analytics",
              "24/7 Support",
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <Check className="h-5 w-5 mr-2 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-200 text-black hover:bg-purple-600 hover:text-white">
            Choose Basic
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-[#131327]/20 backdrop-blur-md border border-white/5 text-white lg:h-[30rem] lg:w-[25rem] sm:w-[35rem] w-[21rem]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Pro Plan
          </CardTitle>
          <CardDescription className="text-gray-200">
            For professionals and businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl sm:text-4xl font-bold text-white mt-[-1rem] mb-3 sm:mb-6">
            $24.99<span className="text-sm sm:text-lg font-normal">/month</span>
          </p>
          <ul className="space-y-2 sm:space-y-3 mb-2">
            {[
              "25GB Storage",
              "Unlimited Bandwidth",
              "Advanced Analytics",
              "Priority Support",
              "Custom Domain",
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <Check className="h-5 w-5 mr-2 text-green-400" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 text-white hover:bg-purple-200 hover:text-black">
            Choose Pro
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
