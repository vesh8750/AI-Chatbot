import axios from "axios";

type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

 export type GetReviewsResponse = {
  summary: string | null;
  reviews: Review[];
};

export type SummaryResponse = {
  summary: string;
};

const fetchReviews = async (productId: number) => {
  const { data } = await axios.get<GetReviewsResponse>(
    `/api/products/${productId}/reviews`
  );
  return data;
};

const summarizeReview = async (productId: number) => {
  const { data } = await axios.post<SummaryResponse>(
    `/api/products/${productId}/reviews/summarY`
  );
  return data;
};

export const reviewsApi = {
  fetchReviews,
  summarizeReview,
};
