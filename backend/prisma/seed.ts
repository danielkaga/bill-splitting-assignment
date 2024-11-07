import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  if (process.env.SEEDED_USER_PASSWORD === undefined) {
    throw new Error('Please provide a value for SEEDED_USER_PASSWORD in your .env file')
  }
  // Generate hashed password
  const hashedPassword = await bcrypt.hash(process.env.SEEDED_USER_PASSWORD, 10)

  // Create a single user
  const user = await prisma.user.create({
    data: {
      email: 'guy@billsplitter.com',
      password: hashedPassword,
      name: faker.person.fullName()
    }
  })

  // Create accounts for the user
  await prisma.account.createMany({
    data: [
      { userId: user.id, name: 'Chequing' },
      { userId: user.id, name: 'Savings' },
      { userId: user.id, name: 'GIC' }
    ]
  })

  const chequingAccount = await prisma.account.findFirst({
    where: { userId: user.id, name: 'Chequing' }
  })
  const savingsAccount = await prisma.account.findFirst({
    where: { userId: user.id, name: 'Savings' }
  })
  const gicAccount = await prisma.account.findFirst({
    where: { userId: user.id, name: 'GIC' }
  })

  // Predefined icon URLs or you can use a placeholder service
  const vendorDetails = [
    {
      category: 'restaurant',
      iconUrl: 'https://img.icons8.com/?size=100&id=114908&format=png&color=000000'
    },
    {
      category: 'grocery',
      iconUrl: 'https://img.icons8.com/?size=100&id=123632&format=png&color=000000'
    },
    {
      category: 'utilities',
      iconUrl: 'https://img.icons8.com/?size=100&id=110197&format=png&color=000000'
    },
    {
      category: 'retail',
      iconUrl: 'https://img.icons8.com/?size=100&id=64655&format=png&color=000000'
    },
    {
      category: 'healthcare',
      iconUrl: 'https://img.icons8.com/?size=100&id=EZg3ufIu5fyl&format=png&color=000000'
    },
    {
      category: 'entertainment',
      iconUrl: 'https://img.icons8.com/?size=100&id=64124&format=png&color=000000'
    }
  ]

  // Create vendors
  await prisma.vendor.createMany({
    data: Array.from({ length: 25 }).map(() => ({
      name: faker.company.name(),
      ...faker.helpers.arrayElement(vendorDetails)
    }))
  })

  const vendorIds = await prisma.vendor.findMany().then((vendors) => vendors.map((v) => v.id))

  // Function to create transactions with random vendors
  const createTransactions = async (accountId: number) => {
    const initialDeposit = {
      accountId,
      vendorId: faker.helpers.arrayElement(vendorIds),
      amount: 100000, // Initial deposit of $1000
      type: faker.helpers.arrayElement(['credit']),
      createdAt: faker.date.past()
    }
    const transactions = [
      initialDeposit,
      ...Array.from({ length: 50 }).map(() => ({
        accountId,
        vendorId: faker.helpers.arrayElement(vendorIds), // Assign a random vendor
        amount: parseFloat(faker.finance.amount({ min: -500, max: -10 })), // Random amount between $10 and $500
        type: 'debit',
        createdAt: faker.date.past()
      }))
    ]
    await prisma.transaction.createMany({ data: transactions })
  }

  // Create 50 transactions for each account
  if (chequingAccount) await createTransactions(chequingAccount.id)
  if (savingsAccount) await createTransactions(savingsAccount.id)
  if (gicAccount) await createTransactions(gicAccount.id)

  // Create 6 contacts for the user
  const contacts = Array.from({ length: 6 }).map(() => ({
    userId: user.id,
    name: faker.person.fullName(),
    email: faker.internet.email()
  }))
  await prisma.contact.createMany({ data: contacts })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
