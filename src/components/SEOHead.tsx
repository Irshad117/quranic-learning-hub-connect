import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Sirat Al-Mustaqim - Online Quran Learning | Expert Teachers | Flexible Schedule",
  description = "Learn Quran online with certified teachers at Sirat Al-Mustaqim Academy. Flexible scheduling, one-on-one classes, Tajweed, memorization, and more. Start your free trial today!",
  canonical,
  image = "https://cdn.pixabay.com/photo/2023/01/24/19/41/al-quran-7741928_1280.jpg",
  type = "website",
  structuredData
}) => {
  const baseUrl = "https://online-quran1.vercel.app";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Sirat Al-Mustaqim Academy" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;