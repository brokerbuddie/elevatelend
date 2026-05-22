"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-900 pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get in touch</h1>
            <p className="text-lg text-navy-300">We are here to help. Reach out anytime.</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Contact information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", value: "1300 000 000", href: "tel:1300000000" },
                    { icon: Mail, label: "Email", value: "hello@elevatelend.com.au", href: "mailto:hello@elevatelend.com.au" },
                    { icon: MapPin, label: "Office", value: "Level 10, 100 George Street\nSydney NSW 2000" },
                    { icon: Clock, label: "Hours", value: "Mon-Fri 8:30am - 6:00pm AEST" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-navy-500 hover:text-gold-500 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-navy-500 whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <Card>
                <CardContent className="p-8">
                  {sent ? (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-bold text-navy-900 mb-2">Message sent!</h3>
                      <p className="text-sm text-navy-500">We will get back to you within 1 business day.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                      className="space-y-5"
                    >
                      <h3 className="text-xl font-bold text-navy-900">Send us a message</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input label="Name" placeholder="Your name" required />
                        <Input label="Email" type="email" placeholder="you@example.com" required />
                      </div>
                      <Input label="Phone" type="tel" placeholder="0400 000 000" />
                      <Input label="Subject" placeholder="How can we help?" required />
                      <Textarea label="Message" placeholder="Tell us more..." rows={5} required />
                      <Button variant="primary" size="lg" className="w-full" type="submit">
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
