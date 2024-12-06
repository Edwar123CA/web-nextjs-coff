"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaArrowLeft } from 'react-icons/fa';
import { Product, Order, Store } from "../../../../../types";
import DataTable from 'react-data-table-component';
import { format, startOfDay, endOfDay, parseISO } from 'date-fns';

interface UserResponse {
  stores: Store[];
}

const Orders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<string>(getTodayDate());
  const [endDate, setEndDate] = useState<string>(getTodayDate());
  const rowsPerPage = 10;

  function getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (!id) {
      setError("User ID is not available.");
      setLoading(false);
      return;
    }
  
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: UserResponse = await res.json();
        const orders = data.stores.flatMap(store => store.orders);
        orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(orders);
        setFilteredOrders(orders);
      } catch (error) {
        setError("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders(); // Inicializa los datos cuando se monta el componente
  
    const intervalId = setInterval(fetchOrders, 10000); // Revalida cada 60 segundos
  
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [id]);//  

  useEffect(() => {
    let filtered = orders;

    // Filtrado por búsqueda
    if (searchTerm !== "") {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Convertir fechas a formato YYYY-MM-DD para comparación
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const formattedStartDate = formatDate(startDateObj);
    const formattedEndDate = formatDate(endDateObj);

    filtered = filtered.filter(order => {
      const orderDate = new Date(order.createdAt);
      const formattedOrderDate = formatDate(orderDate);
      return formattedOrderDate >= formattedStartDate && formattedOrderDate <= formattedEndDate;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reiniciar a la página 1 cuando se filtra
  }, [searchTerm, orders, startDate, endDate]);  //


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-red-600">{error}</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <button
          onClick={handleGoBack}
          className="flex items-center text-teal-500 hover:text-teal-700 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          <span>Go Back</span>
        </button>
        <div className="bg-teal-50 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-center text-2xl font-bold text-teal-700">Orders</h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <div className="flex space-x-4 mb-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <p className="text-center text-lg text-gray-700">No orders found</p>
              ) : (
                <DataTable
                  columns={[
                    {
                      name: 'Order ID',
                      selector: (row: Order) => row.id,
                      sortable: true,
                      cell: (row: Order) => <span className="text-gray-600 font-semibold">{row.id || 'NA'}</span>,
                    },
                    {
                      name: 'Paid',
                      selector: (row: Order) => row.isPaid ? "✅ Yes" : "❌ No",
                      sortable: true,
                    },
                    {
                      name: 'Phone',
                      selector: (row: Order) => <span className="text-cyan-500 font-mono text-base">{row.phone || 'NA'}</span>,
                      sortable: true,
                    },
                    {
                      name: 'Address',
                      selector: (row: Order) => row.address || 'N/A',
                      sortable: true,
                    },
                    {
                      name: 'Prod/Price/Cant',
                      cell: (row: Order) => (
                        row.orderItems.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {row.orderItems.map(item => (
                              <li key={item.id} className="mb-1">
                                <span className="font-bold text-indigo-600">{item.product.name}</span> -
                                <span className="text-green-500 text-xs">${parseFloat(item.product.price).toFixed(2)}</span> -
                                <span className="text-gray-600 font-mono text-sm">{item.cantidad}</span>
                              </li>
                            ))}
                          </ul>
                        ) : 'No products'
                      ),
                    },
                    {
                      name: 'Total',
                      selector: (row: Order) => {
                        const total = row.orderItems.reduce((sum, item) => sum + parseFloat(item.product.price) * item.cantidad, 0);
                        return <span className="font-normal text-sm text-white bg-blue-400 px-2 py-1 rounded-full">${total.toFixed(2)}</span>;
                      },
                      sortable: true,
                    },
                    {
                      name: 'Order Date',
                      selector: (row: Order) => new Date(row.createdAt).toLocaleString('en-LIMA', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      }),
                      sortable: true,
                      cell: (row: Order) => (
                        <span className="text-gray-500">
                          {new Date(row.createdAt).toLocaleString('en-LIMA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </span>
                      ),
                    }
                  ]}
                  data={paginatedOrders}
                  pagination
                  paginationServer
                  paginationTotalRows={filteredOrders.length}
                  onChangePage={handlePageChange}
                  highlightOnHover
                  pointerOnHover
                  customStyles={{
                    rows: {
                      style: {
                        minHeight: '72px', // Mayor altura para un espacio visual más cómodo
                      },
                    },
                    headCells: {
                      style: {
                        backgroundColor: '#f3f4f6',
                        color: '#4B5563',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      },
                    },
                    cells: {
                      style: {
                        padding: '15px',
                      },
                    },
                  }}
                  className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg"
                />

              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
