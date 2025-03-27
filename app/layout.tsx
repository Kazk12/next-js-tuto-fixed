import '@/app/ui/global.css';
import { bungeeShade } from '@/app/ui/fonts';  // Choisis la police la plus horrible

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bungeeShade.className} antialiased`}>{children}</body>
    </html>
  );
}