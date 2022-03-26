import DOMPurify from 'dompurify';

export const cleanData = (value) => DOMPurify.sanitize(value);
