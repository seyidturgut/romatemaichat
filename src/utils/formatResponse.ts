import { ROMATEM_PAGES } from '../config/romatem';

export function formatResponse(text: string): string {
  // First, ensure all URLs have single trailing slash and no double slashes
  Object.entries(ROMATEM_PAGES).forEach(([key, url]) => {
    // Remove trailing slash for processing
    const baseUrl = url.replace(/\/$/, '');
    // Add single trailing slash
    const cleanUrl = `${baseUrl}/`;
    
    // Replace URLs without quotes
    text = text.replace(
      new RegExp(url.replace(/\/+/g, '/'), 'g'), 
      `<a href="${cleanUrl}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">${cleanUrl}</a>`
    );
    
    // Replace URLs with single quotes
    text = text.replace(
      new RegExp(`'${url.replace(/\/+/g, '/')}'`, 'g'),
      `<a href="${cleanUrl}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">${cleanUrl}</a>`
    );
    
    // Replace URLs with double quotes
    text = text.replace(
      new RegExp(`"${url.replace(/\/+/g, '/')}"`, 'g'),
      `<a href="${cleanUrl}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">${cleanUrl}</a>`
    );
    
    // Replace health guide article URLs
    const healthGuideUrl = ROMATEM_PAGES.saglikRehberi.replace(/\/$/, '') + '/';
    if (key === 'saglikRehberi') {
      text = text.replace(
        new RegExp(`'${healthGuideUrl}([^']+)'`, 'g'),
        (match, article) => {
          const cleanArticleUrl = `${healthGuideUrl}${article.replace(/^\/+/, '')}`;
          return `<a href="${cleanArticleUrl}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">${cleanArticleUrl}</a>`;
        }
      );
    }
  });

  // Handle any remaining Romatem URLs
  text = text.replace(
    /'https:\/\/romatem\.com\/[^']+'/g,
    match => {
      const url = match.slice(1, -1); // Remove quotes
      return `<a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">${url}</a>`;
    }
  );

  // Add line breaks before sections
  text = text.replace(/\. (?=Detaylı bilgi için)/, '.<br><br>');
  text = text.replace(/\. (?=Ayrıca Sağlık Rehberi)/, '.<br>');
  text = text.replace(/\. (?=Acil durumlarda)/, '.<br><br>');
  text = text.replace(/\. (?=Başka bir sorunuz)/, '.<br>');

  // Style phone number
  text = text.replace(/444 7 686/g, '<span class="font-semibold">444 7 686</span>');

  // Style addresses
  text = text.replace(/([\w\s]+, [\w\s]+[A-Za-z] (?:Cd|Sk|Bulv)\. No:[\d\-A-Z]+,? [\d]+ [^\.]+)/g, 
    '<span class="text-gray-700">$1</span>');

  return text;
}