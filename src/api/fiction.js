import { request } from './request'

export const CartoonSearch = (iid) =>
    request({
        url: '/?mhname=' + iid,

    })
export const HomeCartoom = (iid) =>
    request({
        url: '/?mhname=' + iid

    })