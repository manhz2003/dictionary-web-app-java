const ManageCategory = () => {
  return (
    <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
      <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow">
        <div className="font-semibold text-[21px]">Category Lists</div>
        <div
          className="flex items-center justify-center p-3 bg-[#d42525] rounded-[8px] 
        text-[#fff] cursor-pointer"
        >
          Add new category
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ManageCategory;
