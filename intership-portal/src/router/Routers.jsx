import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import JobLayouts from "../layouts/JobLayouts";
import DetailJobLayouts from "../layouts/DetailJobLayouts";
import InformationLayouts from "../layouts/InformationLayouts";
import DashboardLayouts from "../layouts/DashboardMhs/DashboardLayouts";
import ProfileLayouts from "../layouts/DashboardMhs/ProfileLayouts";
import ChangePassLayouts from "../layouts/DashboardMhs/ChangePassLayouts";
import LogbookLayouts from "../layouts/DashboardMhs/LogbookLayouts";
import LaporanMagangLayouts from "../layouts/DashboardMhs/LaporanMagangLayouts";
import DospemLayouts from "../layouts/DashboardMhs/DospemLayouts";
import AdminProfileLayouts from "../layouts/AdminDashboard/AdminProfileLayouts";
import ChangePasswordLayouts from "../layouts/AdminDashboard/ChangePasswordLayouts";
import CreateAccountLayouts from "../layouts/AdminDashboard/CreateAccountLayouts";
import AdminInformationLayouts from "../layouts/AdminDashboard/AdminInformationLayouts";
import CreateLokerLayouts from "../layouts/TimMagangDashboard/CreateLokerLayouts";
import AddNewLokerLayouts from "../layouts/TimMagangDashboard/AddNewLokerLayouts";
import ApplicantListLayouts from "../layouts/TimMagangDashboard/ApplicantListLayouts";
import ApplicantDetailLayouts from "../layouts/TimMagangDashboard/ApplicantDetailLayouts";
import LogbookCompanyLayouts from "../layouts/TimMagangDashboard/LogbookCompanyLayouts";
import AdminLogin from "../pages/AdminLogin";
import DetailLokerLayouts from "../layouts/TimMagangDashboard/DetailLokerLayouts";
import EditLokerLayouts from "../layouts/TimMagangDashboard/EditLokerLayouts";
import Forbidden from "../components/Forbidden";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MitraProfileLayouts from "../layouts/TimMagangDashboard/MitraProfileLayouts";
import MitraDashboardLayouts from "../layouts/TimMagangDashboard/MitraDashboardLayouts";
import ServiceError from "../components/ServiceError";
import LandingPageLayouts from "../layouts/LandingPageLayouts";
import PageNotFound from "../components/PageNotFound";
import GettingStarted from "../pages/GettingStarted";
import ContactLayout from "../layouts/ContactLayout";
import { getMhs, refreshToken } from "../redux/Action/LoginMhsAction";
import { refreshTokenUser } from "../redux/Action/LoginAction";
import AdminDashboardLayouts from "../layouts/AdminDashboard/AdminDashboardLayouts";
import AdminKomptensiLayouts from "../layouts/AdminDashboard/AdmiKompetensiLayouts";
import AdminRegulerLayouts from "../layouts/AdminDashboard/AdminRegulerLayouts";
import AdminRegulerDetailLayouts from "../layouts/AdminDashboard/AdminRegulerDetailLayouts";
import AdminKompetensiDetailLayouts from "../layouts/AdminDashboard/AdminKompetensiDetailLayouts";
import KaprodiDashboardLayouts from "../layouts/KaprodiDashboard/KaprodiDashboardLayouts";
import KaprodiProfileLayouts from "../layouts/KaprodiDashboard/KaprodiProfileLayouts";
import KaprodiRegulerLayouts from "../layouts/KaprodiDashboard/KaprodiRegulerLayouts";
import KaprodiKompetensiLayouts from "../layouts/KaprodiDashboard/KaprodiKompetensiLayouts";
import KaprodiLaporanLayouts from "../layouts/KaprodiDashboard/KaprodiLaporanLayouts";
import KaprodiDospemLayouts from "../layouts/KaprodiDashboard/KaprodiDospemLayouts";
import KaprodiRegulerDetialLayouts from "../layouts/KaprodiDashboard/KaprodiRegulerDetialLayouts";
import KaprodiDospemDetailLayouts from "../layouts/KaprodiDashboard/KaprodiDospemDetailLayouts";
import KaprodiLaporanDetailLayouts from "../layouts/KaprodiDashboard/KaprodiLaporanDetailLayouts";
import KaprodiKompetensiDetailLayouts from "../layouts/KaprodiDashboard/KaprodiKompetensiDetailLayouts";
import DospemDashboardLayouts from "../layouts/DospemDashboard/DospemDashboardLayouts";
import DospemProfileLayouts from "../layouts/DospemDashboard/DospemProfileLayouts";
import DospemBimbinganLayouts from "../layouts/DospemDashboard/DospemBimbinganLayouts";
import DospemBimbinganDetailLayouts from "../layouts/DospemDashboard/DospemBimbinganDetailLayouts";
import DospemLogbookLayouts from "../layouts/DospemDashboard/DospemLogbookLayouts";
import DospemLaporanLayouts from "../layouts/DospemDashboard/DospemLaporanLayouts";
import DospemLaporanDetailLayouts from "../layouts/DospemDashboard/DospemLaporanDetailLayouts";
import DospemNilaiLayouts from "../layouts/DospemDashboard/DospemNilaiLayouts";
import DospemNilaiDetailLayouts from "../layouts/DospemDashboard/DospemNilaiDetailLayouts";
import DospemCreateNilaiLayouts from "../layouts/DospemDashboard/DospemCreateNilaiLayouts";
import DospemUpdateNilaiLayouts from "../layouts/DospemDashboard/DospemUpdateNilaiLayouts";
import MitraCompProfileLayouts from "../layouts/MitraDashboard/MitraCompProfileLayouts";
import MitraCreateNilaiLayouts from "../layouts/MitraDashboard/MitraCreateNilaiLayouts";
import MitraUpdateNilaiLayouts from "../layouts/MitraDashboard/MitraUpdateNilaiLayouts";
import MitraNilaiDetailLayouts from "../layouts/MitraDashboard/MitraNilaiDetailLayouts";
import MitraDashboardLayout from "../layouts/MitraDashboard/MitraDashboardLayout";
import MitraNilaiLayouts from "../layouts/MitraDashboard/MitraNilaiLayouts";
import PengajuanLayouts from "../layouts/DashboardMhs/PengajuanLayouts";
import DetailRegulerLayouts from "../layouts/DashboardMhs/DetailRegulerLayouts";
import DetailKompetensiLayouts from "../layouts/DashboardMhs/DetailKompetensiLayouts";
import MagangRegulerLayouts from "../layouts/DashboardMhs/MagangRegulerLayouts";
import MagangKompetensiLayouts from "../layouts/DashboardMhs/MagangKompetensiLayouts";
import UpdateRegulerLayouts from "../layouts/DashboardMhs/UpdateRegulerLayouts";
import UpdateKompetensiLayouts from "../layouts/DashboardMhs/UpdateKompetensiLayouts";
import CreateRegulerLayouts from "../layouts/DashboardMhs/CreateRegulerLayouts";
import CreateKompetensiLayouts from "../layouts/DashboardMhs/CreateKompetensiLayouts";
import NilaiMhsLayouts from "../layouts/DashboardMhs/NilaiMhsLayouts";
import DetailNilaiMhsLayouts from "../layouts/DashboardMhs/DetailNilaiMhsLayouts";
import DetailLaporanLayouts from "../layouts/DashboardMhs/DetailLaporanLayouts";
import LaporanLayouts from "../layouts/DashboardMhs/LaporanLayouts";
import UpdateLaporanLayouts from "../layouts/DashboardMhs/UpdateLaporanLayouts";
import DospemListLayouts from "../layouts/DashboardMhs/DospemListLayouts";
import DetailDospemLayouts from "../layouts/DashboardMhs/DetailDospemLayouts";
import UpdateDospemLayouts from "../layouts/DashboardMhs/UpdateDospemLayouts";
import BimbinganLayouts from "../layouts/DashboardMhs/BimbinganLayouts";
import ForgotPasswordLayouts from "../layouts/DashboardMhs/ForgotPasswordLayouts";
import ForgetPasswordLayouts from "../layouts/AdminDashboard/ForgetPasswordLayouts";
import ResetPasswordLayouts from "../layouts/AdminDashboard/ResetPasswordLayouts";
import ResetPasswordMhsLayouts from "../layouts/DashboardMhs/ResetPasswordMhsLayouts";


const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.loginMhs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (error) {
        console.error("Failed to refresh token");
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [dispatch]);

  if (loading) {
    return <div></div>; // You can replace this with a spinner or loader component
  }

  const isAuthenticated = user.token !== "";

  if (!isAuthenticated) {
    toast.error("You need to login first");
    return <Navigate to="/login" />;
  }

  return children;
};

const PrivateRouteUser = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        await dispatch(refreshTokenUser()).unwrap();
      } catch (error) {
        console.error("Failed to refresh token");
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [dispatch]);

  if (loading) {
    return <div></div>;
  }

  const isAuthenticated = user.token !== "";

  if (!isAuthenticated) {
    toast.error("You need to login first");
    return <Navigate to="/login-admin" />;
  }

  return children;
};

const Routers = () => {
  return (
    <div>
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPageLayouts />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/started" element={<GettingStarted />} />
        <Route path="/forgot-password" element={<ForgotPasswordLayouts />} />
        <Route path="/forget-password" element={<ForgetPasswordLayouts />} />
        <Route path="/auth/reset-password/:token" element={<ResetPasswordLayouts />} />
        <Route path="/mahasiswa/reset-password/:token" element={<ResetPasswordMhsLayouts />} />


        {/* Job */}
        <Route path="/internship" element={<PrivateRoute><JobLayouts /></PrivateRoute>} />
        <Route path="/internship/:id" element={<PrivateRoute><DetailJobLayouts /></PrivateRoute>} />

        {/* Information */}
        <Route path="/information" element={<PrivateRoute><InformationLayouts /></PrivateRoute>} />

        {/* Contact */}
        <Route path="/contact" element={<ContactLayout />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayouts /></PrivateRoute>} />
        <Route path="/dashboard/profile" element={<PrivateRoute><ProfileLayouts /></PrivateRoute>} />
        <Route path="/dashboard/change-password" element={<PrivateRoute><ChangePassLayouts /></PrivateRoute>} />
        <Route path="/dashboard/logbook" element={<PrivateRoute><LogbookLayouts /></PrivateRoute>} />
        <Route path="/dashboard/create-laporan" element={<PrivateRoute><LaporanMagangLayouts /></PrivateRoute>} />
        <Route path="/dashboard/laporan-magang/:id" element={<PrivateRoute><DetailLaporanLayouts /></PrivateRoute>} />
        <Route path="/dashboard/laporan-magang" element={<PrivateRoute><LaporanLayouts /></PrivateRoute>} />
        <Route path="/dashboard/update-laporan/:id" element={<PrivateRoute><UpdateLaporanLayouts /></PrivateRoute>} />
        <Route path="/dashboard/create-dospem" element={<PrivateRoute><DospemLayouts /></PrivateRoute>} />
        <Route path="/dashboard/dosen-pembimbing" element={<PrivateRoute><DospemListLayouts /></PrivateRoute>} />
        <Route path="/dashboard/dosen-pembimbing/:id" element={<PrivateRoute><DetailDospemLayouts /></PrivateRoute>} />
        <Route path="/dashboard/update-dospem/:id" element={<PrivateRoute><UpdateDospemLayouts /></PrivateRoute>} />
        <Route path="/dashboard/pengajuan-magang" element={<PrivateRoute><PengajuanLayouts /></PrivateRoute>} />
        <Route path="/dashboard/magang-reguler" element={<PrivateRoute><MagangRegulerLayouts /></PrivateRoute>} />
        <Route path="/dashboard/magang-kompetensi" element={<PrivateRoute><MagangKompetensiLayouts /></PrivateRoute>} />
        <Route path="/dashboard/magang-reguler/:id" element={<PrivateRoute><DetailRegulerLayouts /></PrivateRoute>} />
        <Route path="/dashboard/magang-kompetensi/:id" element={<PrivateRoute><DetailKompetensiLayouts /></PrivateRoute>} />
        <Route path="/dashboard/update-reguler/:id" element={<PrivateRoute><UpdateRegulerLayouts /></PrivateRoute>} />
        <Route path="/dashboard/update-kompetensi/:id" element={<PrivateRoute><UpdateKompetensiLayouts /></PrivateRoute>} />
        <Route path="/dashboard/create-reguler" element={<PrivateRoute><CreateRegulerLayouts /></PrivateRoute>} />
        <Route path="/dashboard/create-kompetensi" element={<PrivateRoute><CreateKompetensiLayouts /></PrivateRoute>} />
        <Route path="/dashboard/nilai" element={<PrivateRoute><NilaiMhsLayouts /></PrivateRoute>} />
        <Route path="/dashboard/nilai/:id" element={<PrivateRoute><DetailNilaiMhsLayouts /></PrivateRoute>} />
        <Route path="/dashboard/bimbingan" element={<PrivateRoute><BimbinganLayouts /></PrivateRoute>} />

        {/* Dashboard Admin */}
        <Route path="/admin-dashboard" element={<PrivateRouteUser><AdminDashboardLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/profile/:id" element={<PrivateRouteUser><AdminProfileLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/change-password/:id" element={<PrivateRouteUser><ChangePasswordLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/create-account" element={<PrivateRouteUser><CreateAccountLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/magang-kompetensi" element={<PrivateRouteUser><AdminKomptensiLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/magang-kompetensi/:id" element={<PrivateRouteUser><AdminKompetensiDetailLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/magang-reguler" element={<PrivateRouteUser><AdminRegulerLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/magang-reguler/:id" element={<PrivateRouteUser><AdminRegulerDetailLayouts /></PrivateRouteUser>} />
        <Route path="/admin-dashboard/information" element={<PrivateRouteUser><AdminInformationLayouts /></PrivateRouteUser>} />

        {/* Dashboard Kaprodi */}
        <Route path="/kaprodi-dashboard" element={<PrivateRouteUser><KaprodiDashboardLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/profile/:id" element={<PrivateRouteUser><KaprodiProfileLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/magang-reguler" element={<PrivateRouteUser><KaprodiRegulerLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/magang-reguler/:id" element={<PrivateRouteUser><KaprodiRegulerDetialLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/magang-kompetensi" element={<PrivateRouteUser><KaprodiKompetensiLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/magang-kompetensi/:id" element={<PrivateRouteUser><KaprodiKompetensiDetailLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/laporan" element={<PrivateRouteUser><KaprodiLaporanLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/laporan/:id" element={<PrivateRouteUser><KaprodiLaporanDetailLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/dosen-pembimbing" element={<PrivateRouteUser><KaprodiDospemLayouts /></PrivateRouteUser>} />
        <Route path="/kaprodi-dashboard/dosen-pembimbing/:id" element={<PrivateRouteUser><KaprodiDospemDetailLayouts /></PrivateRouteUser>} />

        {/* Dashboard Dospem */}
        <Route path="/dospem-dashboard" element={<PrivateRouteUser><DospemDashboardLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/profile/:id" element={<PrivateRouteUser><DospemProfileLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/bimbingan" element={<PrivateRouteUser><DospemBimbinganLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/bimbingan/:id" element={<PrivateRouteUser><DospemBimbinganDetailLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/logbook" element={<PrivateRouteUser><DospemLogbookLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/laporan" element={<PrivateRouteUser><DospemLaporanLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/laporan/:id" element={<PrivateRouteUser><DospemLaporanDetailLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/nilai" element={<PrivateRouteUser><DospemNilaiLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/nilai/:id" element={<PrivateRouteUser><DospemNilaiDetailLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/create-nilai" element={<PrivateRouteUser><DospemCreateNilaiLayouts /></PrivateRouteUser>} />
        <Route path="/dospem-dashboard/update-nilai/:id" element={<PrivateRouteUser><DospemUpdateNilaiLayouts /></PrivateRouteUser>} />

        {/* Dashboard Mitra */}
        <Route path="/mitra-dashboard" element={<PrivateRouteUser><MitraDashboardLayout /></PrivateRouteUser>} />
        <Route path="/mitra-dashboard/profile/:id" element={<PrivateRouteUser><MitraCompProfileLayouts /></PrivateRouteUser>} />
        <Route path="/mitra-dashboard/nilai" element={<PrivateRouteUser><MitraNilaiLayouts /></PrivateRouteUser>} />
        <Route path="/mitra-dashboard/create-nilai" element={<PrivateRouteUser><MitraCreateNilaiLayouts /></PrivateRouteUser>} />
        <Route path="/mitra-dashboard/update-nilai/:id" element={<PrivateRouteUser><MitraUpdateNilaiLayouts /></PrivateRouteUser>} />
        <Route path="/mitra-dashboard/nilai/:id" element={<PrivateRouteUser><MitraNilaiDetailLayouts /></PrivateRouteUser>} />

        {/* Company Dashboard */}
        <Route path="/company-dashboard" element={<PrivateRouteUser><MitraDashboardLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/profile-company/:id" element={<PrivateRouteUser><MitraProfileLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/internship" element={<PrivateRouteUser><CreateLokerLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/internship/:id" element={<PrivateRouteUser><DetailLokerLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/internship/edit/:id" element={<PrivateRouteUser><EditLokerLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/create-internship" element={<PrivateRouteUser><AddNewLokerLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/applicant" element={<PrivateRouteUser><ApplicantListLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/applicant/:id" element={<PrivateRouteUser><ApplicantDetailLayouts /></PrivateRouteUser>} />
        <Route path="/company-dashboard/logbook" element={<PrivateRouteUser><LogbookCompanyLayouts /></PrivateRouteUser>} />


        {/* Error Page */}
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error-page" element={<ServiceError />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default Routers;
