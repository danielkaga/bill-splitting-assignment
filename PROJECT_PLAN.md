# Project Plan

## Objectives

1. **Flexible Splitting**: Support both equal and custom splits for each bill.
2. **Payment Requests**: Enable users to send and track payment requests.
3. **Mobile-First Design**: Prioritize mobile-friendly, responsive design.
4. **Feature Indicators**: Show placeholders for upcoming features.

## Technical Tasks

### Backend

- **Database Setup**
  - [x] Set up tables and relationships for `User`, `Account`, `Transaction`, `Vendor`, `Contact`, and `Split`.

- **Core API Endpoints**
  - [x] **POST /login**: Creates a session for a user.
  - [x] **GET /accounts**: Retrieve a list of the user's accounts.
  - [x] **GET /accounts/:accountId/transactions**: Retrieve transactions associated with a specific account.
  - [ ] **GET /contacts**: Retrieve a list of contacts for bill splitting.
  - [ ] **POST /accounts/:accountId/transactions/:transactionId/split**: Create or update a split for a specific transaction.

- **Authentication & Session Management**
  - [x] Implement backend authentication (email/password) and session management.

- **Data Seeding for Development**
  - [x] Create a seed file to populate the database with a user, accounts, transactions, and contacts.

### Frontend

- **Login Page**
  - [x] Design and implement a login page where users can enter their credentials to authenticate.

- **Accounts Page**
  - [ ] Build the Accounts page to display transactions and allow account switching.

- **Transaction Page**
  - [ ] Create a Transaction view showing transaction details and options for splitting.

- **Bill Splitting UI**
  - [ ] Implement equal and custom splits, allowing users to specify the amount each contact should pay.
  - [ ] Add UI elements to track payment request statuses (e.g., pending, paid).

- **Responsive Design**
  - [ ] Ensure a mobile-friendly design for phones and tablets.

- **UI Notifications**
  - [ ] Add notifications for bill-splitting actions (e.g., split confirmation, payment request sent).
  - [ ] Implement error handling and display error messages.

- **Feature Placeholders**
  - [ ] Add UI placeholders to indicate upcoming features.

### Testing and Finalization

- [ ] Conduct end-to-end testing to verify backend and frontend integration.
- [ ] Implement error handling for all API calls and UI actions.
- [ ] Finalize styling and ensure responsiveness across device sizes.
