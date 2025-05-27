export const mockCloudinaryResponse = {
  asset_id: 'f9abfb92df7e298fede7d00eaa44e8b7',
  public_id: 'products/hxao9fypyfwvpdmuzumz',
  version: 1747987043,
  version_id: '392d733aee22e32582aa0fb77ff8828d',
  signature: '14371b3858a90eb8bb11d60e189c71edd721ee02',
  width: 275,
  height: 183,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2025-05-23T07:57:23Z',
  tags: [],
  bytes: 9956,
  type: 'upload',
  etag: '684d626fd2a36d88611ae37cd9761ea6',
  placeholder: false,
  url: 'http://res.cloudinary.com/dwwten9jp/image/upload/v1747987043/products/hxao9fypyfwvpdmuzumz.jpg',
  secure_url:
    'https://res.cloudinary.com/dwwten9jp/image/upload/v1747987043/products/hxao9fypyfwvpdmuzumz.jpg',
  folder: 'products',
  access_mode: 'public',
  original_filename: 'test-imageee',
};
export const mockFirebaseLoginSuccess = {
  kind: 'identitytoolkit#VerifyPasswordResponse',
  localId: 'mockedLocalId123',
  email: 'fatima.shahzad@bitsol.tech',
  displayName: 'Fatima Shahzad',
  idToken: 'mockedIdToken',
  registered: true,
  refreshToken: 'mockedRefreshToken',
  expiresIn: '3600',
};

export const mockFirebaseLoginError = {
  error: {
    code: 400,
    message: 'INVALID_PASSWORD',
    errors: [
      {
        message: 'INVALID_PASSWORD',
        domain: 'global',
        reason: 'invalid',
      },
    ],
  },
};

export const mockFirebaseAccountLookupSuccess = {
  users: [
    {
      localId: 'mockedLocalId123',
      email: 'fatima.shahzad@bitsol.tech',
      displayName: 'Fatima Shahzad',
      emailVerified: true,
      disabled: false,
      providerUserInfo: [
        {
          providerId: 'password',
          federatedId: 'fatima.shahzad@bitsol.tech',
          email: 'fatima.shahzad@bitsol.tech',
        },
      ],
      photoUrl: '',
      passwordHash: 'mockedHash',
      passwordUpdatedAt: 1680000000000,
      validSince: '1680000000',
      lastLoginAt: '1680000000000',
      createdAt: '1670000000000',
      lastRefreshAt: '2024-05-20T12:00:00.000Z',
    },
  ],
};
