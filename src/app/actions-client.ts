'use client';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export async function sendContactEmailClient(data: ContactFormInputs): Promise<{ success: boolean; error?: string }> {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { name, email, phone, message } = result.data;

  try {
    // For static deployment, we'll use a form submission approach
    // You can replace this with your preferred email service API
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (phone) formData.append('phone', phone);
    formData.append('message', message);
    
    // You can use services like Formspree, Netlify Forms, or your own API
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to send email.' };
    }
  } catch (exception) {
    console.error('Email sending exception:', exception);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

// Client-side design inspiration (mock data for static deployment)
export const designInspirationData = {
  modern: {
    livingRoom: {
      recommendations: "For a modern living room, consider clean lines, neutral colors, and minimal furniture. Use statement pieces like a bold accent chair or artwork. Incorporate natural materials like wood and stone.",
      visualInspiration: "/images/modern-living-room.jpg"
    },
    bedroom: {
      recommendations: "Create a serene modern bedroom with a platform bed, clean bedding, and minimal decor. Use soft lighting and incorporate natural elements.",
      visualInspiration: "/images/modern-bedroom.jpg"
    },
    kitchen: {
      recommendations: "Modern kitchens feature sleek cabinets, stainless steel appliances, and open shelving. Use a neutral color palette with pops of color through accessories.",
      visualInspiration: "/images/modern-kitchen.jpg"
    }
  },
  minimalist: {
    livingRoom: {
      recommendations: "Minimalist living rooms focus on essential furniture only. Use a monochromatic color scheme and plenty of white space. Choose furniture with clean, simple lines.",
      visualInspiration: "/images/minimalist-living-room.jpg"
    },
    bedroom: {
      recommendations: "A minimalist bedroom should feel uncluttered and peaceful. Use a simple bed frame, minimal bedding, and keep surfaces clear of unnecessary items.",
      visualInspiration: "/images/minimalist-bedroom.jpg"
    },
    kitchen: {
      recommendations: "Minimalist kitchens emphasize function over decoration. Use hidden storage, clean countertops, and a simple color palette.",
      visualInspiration: "/images/minimalist-kitchen.jpg"
    }
  },
  rustic: {
    livingRoom: {
      recommendations: "Rustic living rooms feature natural materials like wood and stone. Use warm colors, vintage furniture, and cozy textiles. Incorporate elements like exposed beams or brick walls.",
      visualInspiration: "/images/rustic-living-room.jpg"
    },
    bedroom: {
      recommendations: "Create a rustic bedroom with wooden furniture, natural fabrics, and warm lighting. Use vintage accessories and natural color palettes.",
      visualInspiration: "/images/rustic-bedroom.jpg"
    },
    kitchen: {
      recommendations: "Rustic kitchens often feature wooden cabinets, stone countertops, and vintage appliances. Use warm colors and natural materials throughout.",
      visualInspiration: "/images/rustic-kitchen.jpg"
    }
  }
};

export function getDesignInspirationClient(roomType: string, designPreferences: string) {
  const preferences = designPreferences.toLowerCase();
  const room = roomType.toLowerCase().replace(' ', '');
  
  if (designInspirationData[preferences as keyof typeof designInspirationData]?.[room as keyof typeof designInspirationData.modern]) {
    return designInspirationData[preferences as keyof typeof designInspirationData][room as keyof typeof designInspirationData.modern];
  }
  
  // Default fallback
  return {
    recommendations: "We're working on expanding our design recommendations. Please contact us for personalized design advice.",
    visualInspiration: "/images/default-inspiration.jpg"
  };
} 