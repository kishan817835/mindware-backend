import AppError from "../../errors/AppError.js";
import { prisma } from '../../utils/prismaClient.js';
import catchDbError from "../../utils/catchDbError.js";
import { uploadMultipleFilesToS3 } from "../upload/upload.service.js";

export const createProduct = catchDbError(async (productData, files) => {
    if (!productData.title || !productData.price || !productData.seller_id || !productData.category_id) {
        throw new AppError("Title, price, seller_id, and category_id are required", 400);
    }

    const sellerId = parseInt(productData.seller_id);
    const categoryId = parseInt(productData.category_id);

    const [seller, category] = await Promise.all([
        prisma.user.findUnique({ where: { user_id: sellerId } }),
        prisma.category.findUnique({ where: { category_id: categoryId } })
    ]);

    if (!seller) {
        throw new AppError("Seller not found", 404);
    }

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    let imageUrls = [];
    if (files && files.length > 0) {
        imageUrls = await uploadMultipleFilesToS3(files);
    }

    const product = await prisma.product.create({
        data: {
            title: productData.title,
            description: productData.description || null,
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock) || 0,
            seller_id: sellerId,
            category_id: categoryId,
            images: {
                create: imageUrls.map(url => ({
                    url: url
                }))
            }
        },
        include: {
            images: true
        }
    });

    return product;
});

export const getProducts = catchDbError(async () => {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            images: true,
            seller: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true
                }
            }
        },
        orderBy: {
            product_id: 'desc'
        }
    });
    return products;
});