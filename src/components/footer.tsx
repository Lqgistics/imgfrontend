import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
    return (
        <footer className="text-gray-300 py-8 mx-auto">
            <div className="grid w-[full] items-center gap-6 py-12 lg:grid-cols-4 grid-cols-2">
                <div className="">
                    <h3 className="font-bold text-white mb-4 text-lg">Image Host</h3>
                    <ul className="space-y-2">
                        <li><Link href="#about" className="hover:text-purple-400 transition-colors duration-300">About Us</Link></li>
                        <li><Link href="#pricing" className="hover:text-purple-400 transition-colors duration-300">Pricing</Link></li>
                        <li><Link href="#login" className="hover:text-purple-400 transition-colors duration-300">Login</Link></li>
                    </ul>
                </div>
                <div className="">
                    <h3 className="font-bold text-white mb-4 text-lg">Support</h3>
                    <ul className="space-y-2">
                        <li><Link href="#help" className="hover:text-purple-400 transition-colors duration-300">Help Center</Link></li>
                        <li><Link href="#contact" className="hover:text-purple-400 transition-colors duration-300">Contact Us</Link></li>
                        <li><Link href="#faq" className="hover:text-purple-400 transition-colors duration-300">FAQs</Link></li>
                    </ul>
                </div>
                <div className="">
                    <h3 className="font-bold text-white mb-4 text-lg">Connect</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300" aria-label="Facebook">
                            <Facebook size={24} />
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300" aria-label="Twitter">
                            <Twitter size={24} />
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300" aria-label="Instagram">
                            <Instagram size={24} />
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://github.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300" aria-label="GitHub">
                            <Github size={24} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-10 pt-8 pb-0 border-t border-gray-800 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    )
}