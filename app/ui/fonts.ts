import { 
  Inter, 
  Lusitana,
  Bungee_Shade

} from 'next/font/google';
 
// Police Inter actuelle
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});


// Police avec des ombres massives qui engloutissent les lettres
export const bungeeShade = Bungee_Shade({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});



