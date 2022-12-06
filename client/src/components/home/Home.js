import React, { useCallback, useState } from "react";
import './home.css';
import { useStats } from '../../data/stats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

const Home = () => {
  const { create, creatingLink, createdLink, setCreatedLink } = useStats()
  const [title, setTitle] = useState(''); 
  const [url, setUrl] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [error, setError] = useState(' ');

  const validateUrl = (url) => {
    // /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    const regex = new RegExp(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'(\\)*+,;=.]+$/);  
    const isValidUrl = regex.test(url)  
    return isValidUrl
  }

  const handleSubmit = useCallback(() => {
    if(validateUrl(url)) {
      create({title, url, description})
      if(!creatingLink) {
        setTitle('')
        setUrl('')
        setDescription('')
      }
      setError('')
    } else {
      setError('link must be a valid url')
    }
  }, [create, title, url, description, creatingLink])

  const handleChange = useCallback((handler) => {
    return (e) => {
      setCreatedLink({});
      return handler(e.target.value)
    }
  }, [setCreatedLink])

  const { url: longUrl, shorturl } = createdLink

  const copy = useCallback((content, message) => {
    return () => {
      navigator.clipboard.writeText(content)
      toast.success(`${message} copied to clipboard`)
    };
  }, [])

  return (
  <div className="form-container">
    <h1 className="shorten-link-title">Shorten Your Link</h1>
    <span className="input-error-fields">{error}</span>
    {shorturl && <div className="urls-response">
      <span onClick={copy(shorturl, 'shortened url')}>
        <FontAwesomeIcon className="response-element" icon={faCopy} />
        <span className="response-element">Shortened Url: </span> 
        <span className="response-element response-element-link" href={shorturl}>{shorturl}</span>
      </span>
        <hr/>
        <span onClick={copy(longUrl, 'original url')}>
          <FontAwesomeIcon className="response-element" icon={faCopy} />
          <span className="response-element">OriginalUrl: </span> 
          <span className="response-element response-element-link" href={longUrl}>{longUrl}</span>
        </span>
    </div>}
      <label className="error-label"></label>
    <form>
      <div className="title-container element-container">
        <div>Title</div>
        <input value={title} onChange={handleChange(setTitle)} className="title" type="text" placeholder="eg: my website's gome page"/>
      </div>
      <div className="link-container element-container">
        <div>Link</div>
        <input value={url} onChange={handleChange(setUrl)} className="link" type="text" placeholder="eg: https://mysite.tech"/>
      </div>
      <div className="description-container element-container">
        <div>Description</div>
        <textarea value={description} onChange={handleChange(setDescription)} className="description" aria-multiline cols="40" rows="5" type="text"
          placeholder="eg: this will be visited whenever a client tries to access the short link and the the number of visited times will be recorded"/>
      </div>
    </form>
      <button disabled={creatingLink} onClick={handleSubmit} className="submit-button">{creatingLink ? 'loading ...' : 'Submit'}</button>
  </div>)
}

export default Home;