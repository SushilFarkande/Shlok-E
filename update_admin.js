const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const newEmail = "shlokmanufacturers@gmail.com";
  const newPassword = "Shlok@123";
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Find all users
  const users = await prisma.user.findMany();
  
  if (users.length > 0) {
    // Update the first/primary user
    const updatedUser = await prisma.user.update({
      where: { id: users[0].id },
      data: {
        email: newEmail,
        password: hashedPassword
      }
    });
    console.log("SUCCESS: Admin credentials updated to", updatedUser.email);
  } else {
    // If somehow no user exists, create one
    const newUser = await prisma.user.create({
      data: {
        email: newEmail,
        password: hashedPassword
      }
    });
    console.log("SUCCESS: Admin user created with", newUser.email);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
