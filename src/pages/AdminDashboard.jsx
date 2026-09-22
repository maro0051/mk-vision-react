import {
  Search,
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  FileText,
  CircleDot,
  BriefcaseBusiness,
  CheckCircle2,
  ArrowUpRight,
  Ban,
  X,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  DollarSign,
  Clock3,
  Repeat,
  Ruler,
  UtensilsCrossed,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useOutletContext } from "react-router-dom";

import { config } from "../config";

import "../admin/admin.css";


/* =========================================================
   STATUS CONFIG
   ========================================================= */

const STATUS_ORDER = [
  "New",
  "Contacted",
  "Quoted",
  "Confirmed",
  "Completed",
  "Cancelled",
];


function getNextStatuses(status) {
  switch (status) {
    case "New":
      return ["Contacted", "Cancelled"];

    case "Contacted":
      return ["Quoted", "Cancelled"];

    case "Quoted":
      return ["Confirmed", "Cancelled"];

    case "Confirmed":
      return ["Completed", "Cancelled"];

    case "Completed":
      return [];

    case "Cancelled":
      return [];

    default:
      return [];
  }
}


function getStatusClass(status) {
  return String(status || "New")
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function normalizeRequest(row) {
  return {
    id:
      row["Request ID"] ||
      row.id ||
      "",

    submittedAt:
      row["Submitted At"] ||
      "",

    language:
      row["Language"] ||
      "en",

    category:
      row["Category"] ||
      "",

    requestType:
      row["Request Type"] ||
      "",

    service:
      row["Service"] ||
      "",

    name:
      row["Name"] ||
      "",

    company:
      row["Company"] ||
      "",

    email:
      row["Email"] ||
      "",

    phone:
      row["Phone"] ||
      "",

    address:
      row["Address"] ||
      "",

    city:
      row["City"] ||
      "",

    postalCode:
      row["Postal Code"] ||
      "",

    serviceDate:
      row["Service/Event Date"] ||
      "",

    preferredTime:
      row["Preferred Time"] ||
      "",

    frequency:
      row["Frequency"] ||
      "",

    propertySize:
      row["Property Size"] ||
      "",

    eventType:
      row["Event Type"] ||
      "",

    venue:
      row["Venue"] ||
      "",

    guestCount:
      row["Guest Count"] ||
      "",

    budget:
      row["Budget"] ||
      "",

    menuRequirements:
      row["Menu Requirements"] ||
      "",

    additionalRequirements:
      row["Additional Requirements"] ||
      "",

    status:
      row["Status"] ||
      "New",
  };
}


/* =========================================================
   DATE FORMAT
   ========================================================= */

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({ status }) {
  const icons = {
    New: CircleDot,
    Contacted: Phone,
    Quoted: DollarSign,
    Confirmed: CheckCircle2,
    Completed: ArrowUpRight,
    Cancelled: Ban,
  };

  const Icon = icons[status] || CircleDot;

  return (
    <span
      className={`admin-status-badge status-badge-${getStatusClass(
        status
      )}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}


/* =========================================================
   MAIN DASHBOARD
   ========================================================= */

export default function AdminDashboard() {
  const outletContext = useOutletContext();

  const language =
    outletContext?.language || "en";

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [statusMessage, setStatusMessage] =
    useState("");

  const [statusError, setStatusError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState("");


  /* =======================================================
     TRANSLATIONS
     ======================================================= */

  const translations = {
    en: {
      eyebrow: "MK VISION",
      dashboard: "Dashboard",
      subtitle:
        "Manage customer requests and service activity.",

      refresh: "Refresh",

      totalRequests: "Total requests",
      newRequests: "New requests",
      active: "Active",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",

      customerRequests: "Customer requests",

      requestDescription:
        "Review and manage your latest cleaning and catering requests.",

      search:
        "Search by name, email, phone or request ID",

      allCategories: "All categories",
      cleaning: "Cleaning",
      catering: "Catering",

      allStatuses: "All statuses",

      requestId: "Request ID",
      customer: "Customer",
      service: "Service",
      serviceDate: "Service date",
      status: "Status",
      actions: "Actions",

      view: "View",
      delete: "Delete",

      requestDetails: "Request details",

      contactInformation: "Contact information",
      location: "Location",
      requestInformation: "Request information",
      eventInformation: "Event information",
      requirements: "Requirements",

      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      address: "Address",
      city: "City",
      postalCode: "Postal code",

      category: "Category",
      requestType: "Request type",
      frequency: "Frequency",
      preferredTime: "Preferred time",
      propertySize: "Property size",

      eventType: "Event type",
      venue: "Venue",
      guestCount: "Guest count",
      budget: "Budget",
      menuRequirements: "Menu requirements",

      additionalRequirements:
        "Additional requirements",

      currentStatus: "Current status",
      updateStatus: "Update status",

      close: "Close",

      noRequests: "No requests found.",
      noRequestsDescription:
        "Try changing your search or filters.",

      confirmDelete:
        "Are you sure you want to delete this request? This action cannot be undone.",

      deleteSuccess: "Request deleted successfully.",

      statusUpdated:
        "Request status updated successfully.",

      unableToLoad:
        "Unable to load customer requests.",

      unableToDelete:
        "Unable to delete this request.",

      unableToUpdate:
        "Unable to update the request status.",

      noInformation: "Not provided",
    },

    fr: {
      eyebrow: "MK VISION",
      dashboard: "Tableau de bord",
      subtitle:
        "Gérez les demandes des clients et les activités de service.",

      refresh: "Actualiser",

      totalRequests: "Demandes totales",
      newRequests: "Nouvelles demandes",
      active: "Actives",
      confirmed: "Confirmées",
      completed: "Terminées",
      cancelled: "Annulées",

      customerRequests: "Demandes des clients",

      requestDescription:
        "Consultez et gérez les dernières demandes de nettoyage et de traiteur.",

      search:
        "Rechercher par nom, courriel, téléphone ou ID",

      allCategories: "Toutes les catégories",
      cleaning: "Nettoyage",
      catering: "Traiteur",

      allStatuses: "Tous les statuts",

      requestId: "ID de demande",
      customer: "Client",
      service: "Service",
      serviceDate: "Date du service",
      status: "Statut",
      actions: "Actions",

      view: "Voir",
      delete: "Supprimer",

      requestDetails: "Détails de la demande",

      contactInformation: "Coordonnées",
      location: "Emplacement",
      requestInformation: "Informations de la demande",
      eventInformation: "Informations sur l'événement",
      requirements: "Exigences",

      name: "Nom",
      company: "Entreprise",
      email: "Courriel",
      phone: "Téléphone",
      address: "Adresse",
      city: "Ville",
      postalCode: "Code postal",

      category: "Catégorie",
      requestType: "Type de demande",
      frequency: "Fréquence",
      preferredTime: "Heure préférée",
      propertySize: "Taille de la propriété",

      eventType: "Type d'événement",
      venue: "Lieu",
      guestCount: "Nombre d'invités",
      budget: "Budget",
      menuRequirements:
        "Exigences du menu",

      additionalRequirements:
        "Exigences supplémentaires",

      currentStatus: "Statut actuel",
      updateStatus: "Mettre à jour",

      close: "Fermer",

      noRequests: "Aucune demande trouvée.",
      noRequestsDescription:
        "Essayez de modifier votre recherche ou vos filtres.",

      confirmDelete:
        "Voulez-vous vraiment supprimer cette demande? Cette action est irréversible.",

      deleteSuccess:
        "Demande supprimée avec succès.",

      statusUpdated:
        "Statut de la demande mis à jour avec succès.",

      unableToLoad:
        "Impossible de charger les demandes des clients.",

      unableToDelete:
        "Impossible de supprimer cette demande.",

      unableToUpdate:
        "Impossible de mettre à jour le statut.",

      noInformation: "Non fourni",
    },
  };

  const t = translations[language];


/* =======================================================
   LOAD REQUESTS
   ======================================================= */

  async function loadRequests(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${config.googleAppsScriptUrl}?action=getRequests`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || t.unableToLoad
        );
      }

      const normalized =
        Array.isArray(data.requests)
          ? data.requests.map(normalizeRequest)
          : [];

      setRequests(normalized);
    } catch (err) {
      console.error(
        "Loading requests failed:",
        err
      );

      setError(t.unableToLoad);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }


  useEffect(() => {
    loadRequests();
  }, []);


  /* =======================================================
     CATEGORIES
     ======================================================= */

  const categories = useMemo(() => {
    const values = requests
      .map((request) => request.category)
      .filter(Boolean);

    return [...new Set(values)];
  }, [requests]);


  /* =======================================================
     FILTER REQUESTS
     ======================================================= */

  const filteredRequests = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !query ||
        request.id
          .toLowerCase()
          .includes(query) ||
        request.name
          .toLowerCase()
          .includes(query) ||
        request.email
          .toLowerCase()
          .includes(query) ||
        request.phone
          .toLowerCase()
          .includes(query) ||
        request.company
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        request.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        request.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    requests,
    search,
    categoryFilter,
    statusFilter,
  ]);


  /* =======================================================
     KPI COUNTS
     ======================================================= */

  const totalRequests =
    requests.length;

  const newRequests =
    requests.filter(
      (request) =>
        request.status === "New"
    ).length;

  const activeRequests =
    requests.filter((request) =>
      [
        "Contacted",
        "Quoted",
        "Confirmed",
      ].includes(request.status)
    ).length;

  const confirmedRequests =
    requests.filter(
      (request) =>
        request.status === "Confirmed"
    ).length;

  const completedRequests =
    requests.filter(
      (request) =>
        request.status === "Completed"
    ).length;

  const cancelledRequests =
    requests.filter(
      (request) =>
        request.status === "Cancelled"
    ).length;


  /* =======================================================
     UPDATE STATUS
     ======================================================= */

  async function handleStatusUpdate(newStatus) {
    if (!selectedRequest) {
      return;
    }

    if (
      !newStatus ||
      newStatus === selectedRequest.status
    ) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setStatusMessage("");
      setStatusError("");

      await fetch(
        config.googleAppsScriptUrl,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            action: "updateStatus",

            requestId:
              selectedRequest.id,

            status: newStatus,
          }),
        }
      );

      setRequests((current) =>
        current.map((request) =>
          request.id ===
          selectedRequest.id
            ? {
                ...request,
                status: newStatus,
              }
            : request
        )
      );

      setSelectedRequest((current) =>
        current
          ? {
              ...current,
              status: newStatus,
            }
          : current
      );

      setStatusMessage(
        t.statusUpdated
      );

      setTimeout(() => {
        loadRequests(true);
      }, 900);
    } catch (err) {
      console.error(
        "Status update failed:",
        err
      );

      setStatusError(
        t.unableToUpdate
      );
    } finally {
      setUpdatingStatus(false);
    }
  }


  /* =======================================================
     DELETE
     ======================================================= */

  async function handleDeleteRequest(request) {
    const confirmed =
      window.confirm(
        t.confirmDelete
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(request.id);
      setError("");

      await fetch(
        config.googleAppsScriptUrl,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            action: "deleteRequest",

            requestId:
              request.id,
          }),
        }
      );

      setRequests((current) =>
        current.filter(
          (item) =>
            item.id !== request.id
        )
      );

      if (
        selectedRequest?.id ===
        request.id
      ) {
        setSelectedRequest(null);
      }

      setTimeout(() => {
        loadRequests(true);
      }, 900);
    } catch (err) {
      console.error(
        "Delete request failed:",
        err
      );

      setError(
        t.unableToDelete
      );
    } finally {
      setDeletingId("");
    }
  }


  /* =======================================================
     DETAIL FIELD
     ======================================================= */

  function DetailField({
    icon: Icon,
    label,
    value,
  }) {
    return (
      <div className="admin-detail-field">
        <div className="admin-detail-icon">
          <Icon size={15} />
        </div>

        <div className="admin-detail-content">
          <span>
            {label}
          </span>

          <strong>
            {value || t.noInformation}
          </strong>
        </div>
      </div>
    );
  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="admin-dashboard">

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="admin-dashboard-header">

        <div>
          <div className="admin-dashboard-eyebrow">
            {t.eyebrow}
          </div>

          <h1>
            {t.dashboard}
          </h1>

          <p>
            {t.subtitle}
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={() =>
            loadRequests(true)
          }
          disabled={refreshing}
        >
          <RefreshCw
            size={16}
            className={
              refreshing
                ? "admin-spin"
                : ""
            }
          />

          {t.refresh}
        </button>

      </section>


      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="admin-global-error">
          {error}
        </div>
      )}


      {/* ===================================================
          KPI CARDS
      =================================================== */}

      <section className="admin-kpi-grid">

        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <FileText size={21} />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {totalRequests}
            </div>

            <div className="admin-kpi-label">
              {t.totalRequests}
            </div>
          </div>
        </div>


        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <CircleDot size={21} />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {newRequests}
            </div>

            <div className="admin-kpi-label">
              {t.newRequests}
            </div>
          </div>
        </div>


        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <BriefcaseBusiness
                size={21}
              />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {activeRequests}
            </div>

            <div className="admin-kpi-label">
              {t.active}
            </div>
          </div>
        </div>


        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <CheckCircle2
                size={21}
              />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {confirmedRequests}
            </div>

            <div className="admin-kpi-label">
              {t.confirmed}
            </div>
          </div>
        </div>


        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <ArrowUpRight
                size={21}
              />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {completedRequests}
            </div>

            <div className="admin-kpi-label">
              {t.completed}
            </div>
          </div>
        </div>


        <div className="admin-kpi-card">
          <div className="admin-kpi-top">
            <div className="admin-kpi-icon">
              <Ban size={21} />
            </div>
          </div>

          <div>
            <div className="admin-kpi-value">
              {cancelledRequests}
            </div>

            <div className="admin-kpi-label">
              {t.cancelled}
            </div>
          </div>
        </div>

      </section>


      {/* ===================================================
          CUSTOMER REQUESTS
      =================================================== */}

      <section className="admin-requests-section">

        <div className="admin-section-header">

          <div>
            <h2>
              {t.customerRequests}
            </h2>

            <p>
              {t.requestDescription}
            </p>
          </div>

          <div className="admin-results-count">
            {filteredRequests.length}
          </div>

        </div>


        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="admin-filter-bar">

          <div className="admin-search-box">

            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={t.search}
            />

            {search && (
              <button
                type="button"
                className="admin-clear-search"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={14} />
              </button>
            )}

          </div>


          <div className="admin-filter-select-wrapper">

            <Filter size={15} />

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                {t.allCategories}
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category ===
                    "Cleaning"
                      ? t.cleaning
                      : category ===
                        "Catering"
                      ? t.catering
                      : category}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={14}
            />

          </div>


          <div className="admin-filter-select-wrapper">

            <CircleDot size={15} />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                {t.allStatuses}
              </option>

              {STATUS_ORDER.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={14}
            />

          </div>

        </div>


        {/* =================================================
            REQUEST TABLE
        ================================================= */}

        <div className="admin-request-card">

          {loading ? (
            <div className="admin-loading-state">

              <div className="admin-loading-spinner" />

              <span>
                Loading...
              </span>

            </div>
          ) : filteredRequests.length ===
            0 ? (
            <div className="admin-empty-state">

              <FileText
                size={38}
              />

              <h3>
                {t.noRequests}
              </h3>

              <p>
                {t.noRequestsDescription}
              </p>

            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-request-table">

                <thead>
                  <tr>

                    <th>
                      {t.requestId}
                    </th>

                    <th>
                      {t.customer}
                    </th>

                    <th>
                      {t.service}
                    </th>

                    <th>
                      {t.serviceDate}
                    </th>

                    <th>
                      {t.status}
                    </th>

                    <th className="admin-actions-heading">
                      {t.actions}
                    </th>

                  </tr>
                </thead>


                <tbody>

                  {filteredRequests.map(
                    (request) => {

                      const statusClass =
                        getStatusClass(
                          request.status
                        );

                      return (
                        <tr
                          key={
                            request.id
                          }
                          className={`admin-request-row status-${statusClass}`}
                        >

                          <td>
                            <div className="admin-request-id">
                              {request.id}
                            </div>
                          </td>


                          <td>
                            <div className="admin-customer">

                              <div className="admin-customer-avatar">
                                {request.name
                                  ?.charAt(
                                    0
                                  )
                                  .toUpperCase() ||
                                  "?"}
                              </div>

                              <div>
                                <div className="admin-customer-name">
                                  {request.name ||
                                    t.noInformation}
                                </div>

                                <div className="admin-customer-email">
                                  {request.email ||
                                    t.noInformation}
                                </div>
                              </div>

                            </div>
                          </td>


                          <td>
                            <div className="admin-service-name">
                              {request.service ||
                                t.noInformation}
                            </div>

                            <div className="admin-service-category">
                              {request.category ||
                                ""}
                            </div>
                          </td>


                          <td>
                            <div className="admin-date">

                              <CalendarDays
                                size={14}
                              />

                              {formatDate(
                                request.serviceDate
                              )}

                            </div>
                          </td>


                          <td>
                            <StatusBadge
                              status={
                                request.status
                              }
                            />
                          </td>


                          <td className="admin-actions-cell">

                            <div className="admin-request-actions">

                              <button
                                type="button"
                                className="admin-action-button admin-view-button"
                                onClick={() => {
                                  setStatusMessage(
                                    ""
                                  );

                                  setStatusError(
                                    ""
                                  );

                                  setSelectedRequest(
                                    request
                                  );
                                }}
                              >
                                <Eye
                                  size={15}
                                />

                                <span>
                                  {t.view}
                                </span>
                              </button>


                              <button
                                type="button"
                                className="admin-action-button admin-delete-button"
                                disabled={
                                  deletingId ===
                                  request.id
                                }
                                onClick={() =>
                                  handleDeleteRequest(
                                    request
                                  )
                                }
                              >
                                <Trash2
                                  size={15}
                                />

                                <span>
                                  {deletingId ===
                                  request.id
                                    ? "..."
                                    : t.delete}
                                </span>
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </section>


      {/* ===================================================
          DETAIL DRAWER
      =================================================== */}

      {selectedRequest && (
        <>

          <div
            className="admin-drawer-overlay"
            onClick={() =>
              setSelectedRequest(null)
            }
          />

          <aside className="admin-request-drawer">

            <div className="admin-drawer-header">

              <div>
                <div className="admin-drawer-eyebrow">
                  {selectedRequest.id}
                </div>

                <h2>
                  {t.requestDetails}
                </h2>
              </div>

              <button
                type="button"
                className="admin-drawer-close"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                <X size={19} />
              </button>

            </div>


            <div className="admin-drawer-body">

              {/* CUSTOMER */}

              <section className="admin-detail-section">

                <h3>
                  {t.contactInformation}
                </h3>

                <div className="admin-detail-grid">

                  <DetailField
                    icon={Users}
                    label={t.name}
                    value={
                      selectedRequest.name
                    }
                  />

                  <DetailField
                    icon={Building2}
                    label={t.company}
                    value={
                      selectedRequest.company
                    }
                  />

                  <DetailField
                    icon={Mail}
                    label={t.email}
                    value={
                      selectedRequest.email
                    }
                  />

                  <DetailField
                    icon={Phone}
                    label={t.phone}
                    value={
                      selectedRequest.phone
                    }
                  />

                </div>

              </section>


              {/* LOCATION */}

              <section className="admin-detail-section">

                <h3>
                  {t.location}
                </h3>

                <div className="admin-detail-grid">

                  <DetailField
                    icon={MapPin}
                    label={t.address}
                    value={
                      selectedRequest.address
                    }
                  />

                  <DetailField
                    icon={MapPin}
                    label={t.city}
                    value={
                      selectedRequest.city
                    }
                  />

                  <DetailField
                    icon={MapPin}
                    label={t.postalCode}
                    value={
                      selectedRequest.postalCode
                    }
                  />

                </div>

              </section>


              {/* REQUEST */}

              <section className="admin-detail-section">

                <h3>
                  {t.requestInformation}
                </h3>

                <div className="admin-detail-grid">

                  <DetailField
                    icon={FileText}
                    label={t.category}
                    value={
                      selectedRequest.category
                    }
                  />

                  <DetailField
                    icon={FileText}
                    label={t.requestType}
                    value={
                      selectedRequest.requestType
                    }
                  />

                  <DetailField
                    icon={BriefcaseBusiness}
                    label={t.service}
                    value={
                      selectedRequest.service
                    }
                  />

                  <DetailField
                    icon={CalendarDays}
                    label={t.serviceDate}
                    value={
                      formatDate(
                        selectedRequest.serviceDate
                      )
                    }
                  />

                  <DetailField
                    icon={Clock3}
                    label={t.preferredTime}
                    value={
                      selectedRequest.preferredTime
                    }
                  />

                  <DetailField
                    icon={Repeat}
                    label={t.frequency}
                    value={
                      selectedRequest.frequency
                    }
                  />

                  <DetailField
                    icon={Ruler}
                    label={t.propertySize}
                    value={
                      selectedRequest.propertySize
                    }
                  />

                </div>

              </section>


              {/* EVENT */}

              {(selectedRequest.category ===
                "Catering" ||
                selectedRequest.eventType ||
                selectedRequest.venue ||
                selectedRequest.guestCount ||
                selectedRequest.budget) && (
                <section className="admin-detail-section">

                  <h3>
                    {t.eventInformation}
                  </h3>

                  <div className="admin-detail-grid">

                    <DetailField
                      icon={CalendarDays}
                      label={t.eventType}
                      value={
                        selectedRequest.eventType
                      }
                    />

                    <DetailField
                      icon={MapPin}
                      label={t.venue}
                      value={
                        selectedRequest.venue
                      }
                    />

                    <DetailField
                      icon={Users}
                      label={t.guestCount}
                      value={
                        selectedRequest.guestCount
                      }
                    />

                    <DetailField
                      icon={DollarSign}
                      label={t.budget}
                      value={
                        selectedRequest.budget
                      }
                    />

                  </div>

                </section>
              )}


              {/* REQUIREMENTS */}

              {(selectedRequest.menuRequirements ||
                selectedRequest.additionalRequirements) && (
                <section className="admin-detail-section">

                  <h3>
                    {t.requirements}
                  </h3>

                  {selectedRequest.menuRequirements && (
                    <div className="admin-text-detail">

                      <div className="admin-text-detail-title">
                        <UtensilsCrossed
                          size={15}
                        />

                        {t.menuRequirements}
                      </div>

                      <p>
                        {
                          selectedRequest.menuRequirements
                        }
                      </p>

                    </div>
                  )}


                  {selectedRequest.additionalRequirements && (
                    <div className="admin-text-detail">

                      <div className="admin-text-detail-title">
                        <MessageSquare
                          size={15}
                        />

                        {t.additionalRequirements}
                      </div>

                      <p>
                        {
                          selectedRequest.additionalRequirements
                        }
                      </p>

                    </div>
                  )}

                </section>
              )}


              {/* STATUS */}

              <section className="admin-detail-section admin-status-section">

                <h3>
                  {t.currentStatus}
                </h3>

                <div className="admin-current-status">
                  <StatusBadge
                    status={
                      selectedRequest.status
                    }
                  />
                </div>

                {getNextStatuses(
                  selectedRequest.status
                ).length > 0 && (
                  <div className="admin-status-update-box">

                    <select
                      value=""
                      disabled={
                        updatingStatus
                      }
                      onChange={(event) =>
                        handleStatusUpdate(
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        {t.updateStatus}
                      </option>

                      {getNextStatuses(
                        selectedRequest.status
                      ).map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}

                    </select>

                    <ChevronDown
                      size={15}
                    />

                  </div>
                )}


                {statusMessage && (
                  <div className="admin-status-success">
                    {statusMessage}
                  </div>
                )}

                {statusError && (
                  <div className="admin-status-error">
                    {statusError}
                  </div>
                )}

              </section>

            </div>

          </aside>

        </>
      )}

    </div>
  );
}