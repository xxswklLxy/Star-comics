import { request } from './request'

export const Cartoonlist = (iid) =>
    request({
        url: '/?mhlb=' + iid
    })

export const CartoonDetails = (iid) =>
    request({
        url: '/?mhurl1=' + iid,

    })
export const CartoonPicture = (iid) =>
    request({
        url: '/?mhurl2=' + iid,

    })