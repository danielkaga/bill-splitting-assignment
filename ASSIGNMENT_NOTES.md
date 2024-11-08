# Notes for Interview Assignment

## Time Estimates and Tasks

**Estimated Time Taken:**
- **Backend Development**: 5 hours
- **Frontend Development**: 10 hours
- **Research & Learning Vue.js**: 2 hours
- **Documentation**: 1 hours

**Total time: ~18 hours**

## Tools and Libraries Used

- **Backend**:
  - `Express`
  - `Prisma` (Database ORM)
  - `jsonwebtoken` (Token-based auth)
- **Frontend**:
  - `Vue.js`
  - `TailwindCSS` and `DaisyUI` (UI styling)
  - `ThunderClient` (API testing/validation)
  - `Commitizen` (Commit formatting)
  - `GitHub Copilot` (autocomplete/intellisense and help with Vue framework)
- **Dev Tools**:
  - Chrome Developer Tools for debugging.

## Navigating the App

### Pre-requisites

Run the Backend and Frontend apps:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

### Flow

1. **Login**:
   - Enter the email and password for the seeded user on the login page at `localhost:300.
      - email: `guy@fairshare.com`
      - password: `staychill` or custom value based onSEEDED_USER_PASSWORD
   - If authenticated, you will be redirected to the Accounts page.

2. **Accounts Page**:
   - View a set of accounts and their transactions.
   - Click on an account to view its transactions.

3. **Transaction Details**:
   - Select a transaction to view details.
   - Split a bill by selecting `Split This Bill` button, selecting contacts, setting amounts and hitting the `Request Payments` button


## Incomplete Items

- Unit and E2E tests
- Logout function
- Full error handling
- More professional UI
- Optimizations for Vue framework

## Additional Notes

This was the first time using Vue.js, so there was a learning curve.