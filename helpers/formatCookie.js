const getJwt = cookies => {
  let cookiesList = {}
  cookies.split(';').forEach( c => {
    const sections = c.split('=');
    cookiesList[sections.shift().trim()] = decodeURI(sections.join('='));
  });

  const token = cookiesList.jwt;
  return token;
}

export default getJwt;