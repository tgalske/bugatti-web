export function prettyPrintPhone(rawPhoneNumber) {
  const cleaned = ('' + rawPhoneNumber).replace(/\D/g, '');

  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  } else {
    return rawPhoneNumber;
  }
}

