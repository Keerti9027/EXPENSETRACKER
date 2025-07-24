import React, { useContext, useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImageUrl || null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profilePic) {
      setPreviewUrl(URL.createObjectURL(profilePic));
    } else {
      setPreviewUrl(user?.profileImageUrl || null);
    }
    return () => {
      if (profilePic) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line
  }, [profilePic, user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let profileImageUrl = user?.profileImageUrl || '';
    try {
      if (profilePic) {
        const formData = new FormData();
        formData.append('image', profilePic);
        const imgRes = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        profileImageUrl = imgRes.data.imageUrl;
      }
      const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        fullName,
        password: password || undefined,
        profileImageUrl,
      });
      updateUser(res.data.user);
      toast.success('Profile updated successfully!');
      setPassword('');
      setEditMode(false);
      setShowChangePassword(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearUser();
    localStorage.clear();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.AUTH.DELETE_ACCOUNT);
      toast.success('Account deleted successfully.');
      handleLogout();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-purple-50 to-blue-50 py-8">
        <form onSubmit={handleProfileUpdate} className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col items-center gap-8 border border-purple-100">
          <h2 className="text-3xl font-bold text-primary mb-2">My Profile</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-2">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-100 text-4xl text-primary font-bold">
                  {user?.fullName?.[0] || 'U'}
                </div>
              )}
            </div>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{user?.fullName}</div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 mt-4">
            <div className="flex gap-3 justify-center">
              <button type="button" className="add-btn px-6 py-2" onClick={() => setEditMode((v) => !v)}>
                {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button type="button" className="add-btn px-6 py-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
            {editMode && (
              <>
                <Input
                  value={fullName}
                  onChange={({ target }) => setFullName(target.value)}
                  label="Full Name"
                  placeholder="Your Name"
                  type="text"
                />
                <button
                  type="button"
                  className="add-btn px-6 py-2"
                  onClick={() => setShowChangePassword((v) => !v)}
                >
                  {showChangePassword ? 'Cancel Change Password' : 'Change Password'}
                </button>
                {showChangePassword && (
                  <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="New Password"
                    placeholder="Leave blank to keep current password"
                    type="password"
                  />
                )}
                <button
                  type="submit"
                  className="btn-primary w-full mt-2 text-lg py-3"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
            {/* Account Settings/Preferences Section */}
            <div className="mt-6 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Settings & Preferences</h3>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 text-sm">
                <p>Preferences and settings can be managed here. (Coming soon!)</p>
              </div>
            </div>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-6 py-2 mt-6 w-full transition"
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting Account...' : 'Delete Account'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 