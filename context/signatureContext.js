import React from 'react'

const fieldsInfo = {
  name: null,
  aftername: null,
  position: null,
  license: null,
  email: null,
  phone: null,
  brokerage: null,
  website: null,
  applicationLink: null,
  instagram: null,
  facebook: null,
  twitter: null,
  linkedin: null,
  youtube: null
}

const SignatureContext = React.createContext(fieldsInfo)

export default SignatureContext
