const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
loadCategories();
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  // console.log(categoryContainer);
  for (let cat of categories) {
    // console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button onclick = "loadCategoryVideos(${cat.category_id})" class="btn btn-sm px-4 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};
// loadVideos();
const displayVideos = (videos) => {
  console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = ` <div class=" col-span-full flex flex-col items-center justify-center py-24">
          <img class="w-[120px] " src="Icon.png" alt="">
          <h2 class="font-bold text-3xl pt-8 text-center">Oops!!!Sorry there is no content</h2>
        </div>`;
    return;
  }
  videos.forEach((video) => {
    // console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
          <figure class="relative">
            <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
            <span
              class="absolute bottom-2 right-2 text-sm bg-gray-500 rounded-md text-white px-2"
              >3hrs 56 min ago</span
            >
          </figure>
          <div class="flex gap-3 px-0 py-5">
            <div class="profile">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
            </div>
            <div class="text">
              <h2 class="text-sm font-semibold">${video.title}</h2>
              <p class="flex gap-1 text-sm text-gray-400">${video.authors[0].profile_name}
                <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
              </p>
              <p class="text-sm text-gray-400">${video.others.views}</p>
            </div>
          </div>
        </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};
