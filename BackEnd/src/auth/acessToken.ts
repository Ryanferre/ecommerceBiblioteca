import { jwtVerify, createRemoteJWKSet } from 'jose'

const JWKS = createRemoteJWKSet(
  new URL('https://hopeful-spaniel-56.clerk.accounts.dev/.well-known/jwks.json')
)

export async function authenticateClerck( token: any ) {
  
  if (!token) {
    return ({ error: 'No token' })
  }

  const tokenAcess = token.replace('Bearer ', '')

  const { payload } = await jwtVerify(tokenAcess, JWKS)
  

  // 🔥 A LINHA MAIS IMPORTANTE DO SEU BACK
  return payload
}