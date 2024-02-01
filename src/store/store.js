import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
});


export const productImageStore = create(devtools((set) => ({
  imageList: [],
  seqList : [],
  subCategorySeq : 0,
  reviewList : [],

  addImageList: (newImage) => set((state) => ({
    imageList: [...state.imageList, newImage]
  })),

  deleteImage: (imageToRemove) => set((state) => ({
    imageList: state.imageList.filter(image => image !== imageToRemove)
  })),

  addSeq: (newSeq) => set((state) => ({
    seqList: [...state.seqList, newSeq]
  })),

  deleteSeq: (seqToRemove) => set((state) => ({
    seqList: state.seqList.filter(seq => seq !== seqToRemove)
  })),

  setSubCategorySeq: (categorySeq) => set ({
    subCategorySeq: categorySeq
  }),

  addReviewList: (newReview) => set((state) => ({
    reviewList : [...state, newReview]
  })),

  deleteReview: (reviewToRemove) => set((state) => ({
    reviewList: state.reviewList.filter(review => review !== reviewToRemove)
  })),
  
}), "productImageStore")); // 여기에서 "productImageStore"는 DevTools에서 표시될 스토어의 이름입니다.

const useStore = create(
  process.env.REACT_APP_NODE_ENV !== "production" ? devtools(store) : store,
);

export default useStore;




