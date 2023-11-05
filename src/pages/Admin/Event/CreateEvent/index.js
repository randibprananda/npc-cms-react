import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { FooterAdmin, HeaderAdmin, Sidebar } from "../../../../component";
import { usePostEvent } from "../../../../hooks/fetch/event/usePostEvent";
import { showToastMessage } from "../../../../lib/toast";
const handleKeyDown = (event) => {
  if (
    ![
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105, 8, 37, 38, 39, 40,
    ].includes(event.keyCode)
  ) {
    event.preventDefault();
  }
  if (event.keyCode === 189) {
    event.preventDefault();
  }
};

const initialValues = {
  title: "",
  opening: "",
  closing: "",
  location: "",
  count: "",
  image: "",
};

const eventSchema = z.object({
  title: z.string({ required_error: "Title tidak boleh kosong" }),
  opening: z.string({ required_error: "Opening tidak boleh kosong" }),
  closing: z.string({ required_error: "Closing tidak boleh kosong" }),
  location: z.string({ required_error: "Location tidak boleh kosong" }),
  count: z.string({ required_error: "Count tidak boleh kosong" }),
  image: z.string({ required_error: "Image tidak boleh kosong" }),
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const { mutate: postEvent } = usePostEvent({
    onSuccess: () => {
      showToastMessage("Data berhasil ditambahkan", "success");
      navigate(-1);
    },
    onError: () => {
      showToastMessage("Data gagal ditambahkan", "error");
    },
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(eventSchema),
    initialValues: initialValues,
    onSubmit: async () => {
      const data = {
        title: formik.values.title,
        opening: formik.values.opening,
        closing: formik.values.closing,
        location: formik.values.location,
        count: formik.values.count,
        image: formik.values.image,
      };
      await postEvent(data);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex">
        <Sidebar />
        <div className="w-screen -my-2 overflow-hidden">
          <HeaderAdmin title="Event" />
          <div className="px-8 py-[70px]">
            <div className="py-[33px] px-[34px] shadow-card rounded-[10px]">
              <h1 className="mb-8 text-xl font-bold">Add Event</h1>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Name Event
                </h1>
                <input
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="name"
                  type="text"
                  value={formik.values.title}
                  onChange={(e) =>
                    formik.setFieldValue("title", e.target.value)
                  }
                  placeholder="Name sport"
                />
                <span className="text-red-500">{formik.errors.title}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Event Type
                </h1>
                <select
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="event-type"
                >
                  <option value="" selected disabled>
                    Select event type...
                  </option>
                  <option>Asean</option>
                  <option>Asian</option>
                  <option>Paralympic</option>
                </select>
              </div>
              <div className="flex flex-col mb-2 gap-y-1">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Picture
                </h1>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    name="foto"
                    accept="image/jpeg, image/png" // Hanya menerima jenis file JPG dan PNG
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      if (!file) {
                        return; // Tidak ada file yang diunggah
                      }

                      // Mendapatkan ekstensi file
                      const fileExtension = file.name
                        .split(".")
                        .pop()
                        .toLowerCase();

                      // Memeriksa apakah ekstensi file adalah jpg atau png
                      if (
                        fileExtension !== "jpg" &&
                        fileExtension !== "jpeg" &&
                        fileExtension !== "png"
                      ) {
                        showToastMessage(
                          "Hanya gambar JPG atau PNG yang diperbolehkan",
                          "error"
                        );
                        return; // Jenis file tidak valid, jangan lanjutkan
                      }

                      // Check if the file size exceeds 2MB (2 * 1024 * 1024 bytes)
                      if (file.size > 2 * 1024 * 1024) {
                        showToastMessage(
                          "Ukuran gambar tidak boleh lebih dari 2MB",
                          "error"
                        );
                        return; // Ukuran file terlalu besar, jangan lanjutkan
                      }

                      reader.readAsDataURL(file);

                      reader.onloadend = () => {
                        setImage(reader.result);
                        formik.setFieldValue("image", reader.result);
                      };
                    }}
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-[#EE393E] text-white px-4 py-2 rounded"
                  >
                    Upload File
                  </label>
                </div>
                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="object-cover w-32 h-32 rounded"
                    />
                  </div>
                )}
                <span className="text-red-500">{formik.errors.image}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Location
                </h1>
                <input
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="location"
                  type="text"
                  placeholder="Enter the location..."
                  value={formik.values.location}
                  onChange={(e) =>
                    formik.setFieldValue("location", e.target.value)
                  }
                />
                <span className="text-red-500">{formik.errors.location}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Opening
                </h1>
                <input
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="opening"
                  type="date"
                  placeholder="Enter the opening date..."
                  value={formik.values.opening}
                  onChange={(e) =>
                    formik.setFieldValue("opening", e.target.value)
                  }
                />
                <span className="text-red-500">{formik.errors.opening}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Time
                </h1>
                <input
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="time"
                  type="time"
                  placeholder="Enter the time..."
                  value={formik.values.count}
                  onChange={(e) =>
                    formik.setFieldValue("count", e.target.value)
                  }
                />
                <span className="text-red-500">{formik.errors.count}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Closing
                </h1>
                <input
                  className="appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs"
                  id="closing"
                  type="date"
                  placeholder="Enter the closing date..."
                  value={formik.values.closing}
                  onChange={(e) =>
                    formik.setFieldValue("closing", e.target.value)
                  }
                />
                <span className="text-red-500">{formik.errors.closing}</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                      Gold Medals
                    </h1>
                    <input
                      type="number"
                      className="appearance-none block text-center w-full border bg-light text-black py-2.5 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs rounded-[10px]"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                      Silver Medals
                    </h1>
                    <input
                      type="number"
                      className="appearance-none block text-center w-full border bg-light text-black py-2.5 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs rounded-[10px]"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                      Bronze Medals
                    </h1>
                    <input
                      type="number"
                      className="appearance-none block text-center w-full border bg-light text-black py-2.5 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs rounded-[10px]"
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-6">
                <button
                  type="button"
                  className="bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </form>
  );
};

export default CreateEvent;
