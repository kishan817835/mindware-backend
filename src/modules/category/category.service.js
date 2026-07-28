import AppError from "../../errors/AppError.js";
import { prisma } from '../../utils/prismaClient.js';
import catchDbError from "../../utils/catchDbError.js";

export const createCategory = catchDbError(async (categoryData) => {
    if (!categoryData.name) {
        throw new AppError("Category name is required", 400);
    }

    const category = await prisma.category.create({
        data: {
            name: categoryData.name
        }
    });

    return category;
});

export const getCategories = catchDbError(async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            category_id: 'asc'
        }
    });
    return categories;
});
