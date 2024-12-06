"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Size, Color, Product, Store } from "../../../../../types";
import { Trash2, Edit, CheckCircle, XCircle, PlusIcon, Eye, Grid } from 'lucide-react';
import Link from "next/link";
import PreviewModal from "@/app/views/components/preview-modal";
import usePreviewModal from "@/app/views/hooks/use-preview-modal";

interface UserResponse {
  stores: Store[];
}

const ProductPage = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const previewModal = usePreviewModal();

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (!id) {
      setError("User ID is not available.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: UserResponse = await res.json();
        const products = data.stores.flatMap(store => store.products);
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleArchiveToggle = async (productId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isArchived: !currentStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await res.json();
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, isArchived: !currentStatus } : product
        )
      );
      toast.success(`Product ${!currentStatus ? 'archived' : 'unarchived'} successfully.`);
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/product/edit-product/${id}`);
  };
  const handleView = (product: Product) => {
    previewModal.onOpen(product, true, true);
  };

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Producto editado.');

      const timer = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete('success');
        window.history.replaceState(null, '', `${window.location.pathname}?${newParams.toString()}`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-gray-700">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-red-600">{error}</p>
    </div>
  );
  if (products.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">No products found</p>
    </div>
  );

  // Configuración de columnas para DataTables
  const columns = [
    {
      name: 'Name',
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: Product) => `$${parseFloat(row.price).toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Size',
      selector: (row: Product) => row.size ? row.size.value : 'N/A',
      sortable: true,
    },
    {
      name: 'Color',
      cell: (row: Product) => row.color ? (
        <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: row.color.value }} />
      ) : 'N/A',
    },
    {
      name: 'Archived',
      cell: (row: Product) => row.isArchived ? (
        <FaTimesCircle size={20} className="text-red-500" />
      ) : (
        <FaCheckCircle size={20} className="text-green-500" />
      ),
    },
    {
      name: 'View',
      cell: (row: Product) => (
        <button
          onClick={() => handleView(row)}
          className="text-gray-500 hover:text-gray-900"
          aria-label="View details"
        >
          <Eye size={16} />
        </button>
      ),
    },
    {
      name: 'Actions',
      cell: (row: Product) => (
        <>
          <button
            onClick={() => handleEdit(row.id)}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleArchiveToggle(row.id, row.isArchived)}
            className={`text-sm ${row.isArchived ? 'text-green-500' : 'text-red-500'} hover:underline`}
          >
            {row.isArchived ? 'Unarch' : 'Arch'}
          </button>
        </>
      ),
    },
    {
      name: 'Updated',
      selector: (row: Product) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <Link href="/admin/dashboard/cm0bowhx700002vrjcinrzutc">
          <button
            className="flex items-center text-blue-500 hover:text-red-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </button>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-blue-700">Products</h3>
            <Link href='/admin/product/create/'>
              <button className='bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                <PlusIcon className='h-5 w-5' aria-hidden="true" />
                <span>Add Product</span>
              </button>
            </Link>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredProducts}
            pagination
            highlightOnHover
            pointerOnHover
            className="overflow-x-auto rounded-lg border border-gray-200 shadow-md"
          />
        </div>
      </div>
      <Footer />
      <ToastContainer />
      <PreviewModal hidePedido={true} />
    </div>
  );
};

export default ProductPage;
