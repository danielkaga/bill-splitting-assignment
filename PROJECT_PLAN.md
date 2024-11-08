# Project Plan - FairShare

## Objectives

1. **Flexible Splitting**: Support equal and custom splits for each bill.
2. **Payment Requests**: Enable users to send and track payment requests.
3. **Mobile-First Design**: Focus on a responsive, mobile-friendly interface.
4. **Feature Indicators**: Placeholder elements for upcoming features.

## Technical Tasks

### Backend

- **Database Schema**
  - [x] Models: `User`, `Account`, `Transaction`, `Vendor`, `Contact`, and `Split`.

- **API Endpoints**
  - [x] **POST /login**: Authenticate user and create a session.
  - [x] **GET /accounts**: Retrieve user's accounts.
  - [x] **GET /accounts/:accountId/transactions**: Retrieve transactions for an account.
  - [x] **GET /contacts**: Retrieve contacts for bill splitting.
  - [x] **POST /transactions/:transactionId/splits**: Create/update a split for a transaction.
  - [x] **GET /transactions/:transactionId/splits**: Retrieve splits for a transaction.

- **Authentication**
  - [x] Email/password authentication using session management.

- **Data Seeding**
  - [x] Seed database with sample data for development.

### Frontend

- **Login Page**
  - [x] Implement user login page.

- **Accounts Page**
  - [x] Display accounts and transactions.

- **Transaction Details**
  - [x] Provide transaction details and bill-splitting options.

- **Bill Splitting UI**
  - [x] Support equal and custom splits with contact selection.
  - [x] Display split status (pending, paid).

- **Responsive Design**
  - [x] Mobile-first design for phones and tablets.

- **UI Notifications & Error Handling**
  - [ ] Notifications for split actions and error handling.

## Testing & Finalization

- [ ] End-to-end testing.
- [ ] Error handling.
- [x] Final styling and responsiveness.