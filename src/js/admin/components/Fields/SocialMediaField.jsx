/**
 * ThemePlus Social Media Field - Repeater Style
 * Dynamic social media links with platform selection
 *
 * File: src/js/admin/components/Fields/SocialMediaField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Select from '../Common/Select';
import Button from "../Common/Button";
import FileUpload from "../Common/FileUpload";

function SocialMediaField({
                            id,
                            label,
                            value = [],
                            onChange,
                            help = '',
                            max = 20,
                          }) {
  const [links, setLinks] = useState(value);

  /**
   * Available social platforms with FontAwesome icons
   */
  const platforms = {
    facebook: {label: 'Facebook', icon: 'fa-brands fa-facebook-f'},
    twitter: {label: 'Twitter / X', icon: 'fa-brands fa-x-twitter'},
    instagram: {label: 'Instagram', icon: 'fa-brands fa-instagram'},
    linkedin: {label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in'},
    youtube: {label: 'YouTube', icon: 'fa-brands fa-youtube'},
    pinterest: {label: 'Pinterest', icon: 'fa-brands fa-pinterest-p'},
    tiktok: {label: 'TikTok', icon: 'fa-brands fa-tiktok'},
    snapchat: {label: 'Snapchat', icon: 'fa-brands fa-snapchat'},
    whatsapp: {label: 'WhatsApp', icon: 'fa-brands fa-whatsapp'},
    telegram: {label: 'Telegram', icon: 'fa-brands fa-telegram-plane'},
    reddit: {label: 'Reddit', icon: 'fa-brands fa-reddit-alien'},
    github: {label: 'GitHub', icon: 'fa-brands fa-github'},
    dribbble: {label: 'Dribbble', icon: 'fa-brands fa-dribbble'},
    behance: {label: 'Behance', icon: 'fa-brands fa-behance'},
    medium: {label: 'Medium', icon: 'fa-brands fa-medium-m'},
    vimeo: {label: 'Vimeo', icon: 'fa-brands fa-vimeo-v'},
    twitch: {label: 'Twitch', icon: 'fa-brands fa-twitch'},
    discord: {label: 'Discord', icon: 'fa-brands fa-discord'},
    spotify: {label: 'Spotify', icon: 'fa-brands fa-spotify'},
    soundcloud: {label: 'SoundCloud', icon: 'fa-brands fa-soundcloud'},
  };

  /**
   * Add new link
   */
  const addLink = () => {
    if (links.length >= max) return;

    const newLinks = [
      ...links,
      {platform: 'facebook', url: ''}
    ];
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Remove link
   */
  const removeLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Update link
   */
  const updateLink = (index, field, newValue) => {
    const newLinks = [...links];
    newLinks[index] = {
      ...newLinks[index],
      [field]: newValue
    };
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Move link up
   */
  const moveUp = (index) => {
    if (index === 0) return;
    const newLinks = [...links];
    [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Move link down
   */
  const moveDown = (index) => {
    if (index === links.length - 1) return;
    const newLinks = [...links];
    [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
    setLinks(newLinks);
    onChange(newLinks);
  };

  return (
    <div className="tpo-field tpo-field--social-media">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
          {links.length > 0 && (
            <span className="tpo-field__counter">
              {links.length} {links.length === 1 ? __('link', 'themeplus') : __('links', 'themeplus')}
            </span>
          )}
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-social-media tpo-field-card">
          {/* Links list */}
          {links.length > 0 && (
            <div className="tpo-social-media__list">
              {links.map((link, index) => {
                const platformData = platforms[link.platform] || platforms.facebook;

                return (
                  <div key={index} className="tpo-social-media__item">
                    {/* Platform icon */}
                    <div
                      className="tpo-social-media__icon"
                      style={{backgroundColor: platformData.color}}
                    >
                      <i className={`${platformData.icon}`}/>
                    </div>

                    {/* Fields */}
                    <div className="tpo-social-media__fields">
                      {/* Platform selector */}
                      <Select
                        value={link.platform}
                        onChange={(val) => updateLink(index, 'platform', val)}
                        options={Object.entries(platforms).map(([key, data]) => ({
                          value: key,
                          label: (
                            <>
                              <span className="tpo-social-media__label"><i className={`fab fa-${key}`}></i> {data.label}</span>
                            </>
                          ),
                        }))}
                        className="tpo-social-media__platform"
                      />

                      {/* URL input */}
                      <input
                        type="url"
                        className="tpo-social-media__url"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        placeholder={`https://${link.platform}.com/yourprofile`}
                      />
                    </div>

                    {/* Actions */}
                    <div className="tpo-social-media__actions tpo-actions-bar">
                      <Button
                        color="muted"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        title={__('Move up', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Move up', 'themeplus')}>
                        <i className="fa-solid fa-chevron-up"></i>
                      </Button>

                      <Button
                        color="muted"
                        onClick={() => moveDown(index)}
                        disabled={index === links.length - 1}
                        title={__('Move down', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Move down', 'themeplus')}>
                        <i className="fa-solid fa-chevron-down"></i>
                      </Button>

                      <Button
                        color="muted"
                        onClick={() => removeLink(index)}
                        title={__('Remove', 'themeplus')}
                        iconOnly={true}
                        ariaLabel={__('Remove', 'themeplus')}>
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add button */}
          <FileUpload
            variant="button"
            icon="fa-plus"
            label={
              <>
                {__('Add Social Link', 'themeplus')}
                {max < 999 && (
                  <span className="tpo-social-media__limit">
                    ({links.length}/{max})
                  </span>
                )}
              </>
            }
            onClick={addLink}
            disabled={links.length >= max}
            className="tpo-social-media__add"
          />

          {/* Empty state */}
          {links.length === 0 && (
            <div className="tpo-social-media__empty">
              <i className="fa-solid fa-share-nodes"></i>
              <p>{__('No social media links yet. Click the button above to add one.', 'themeplus')}</p>
            </div>
          )}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default SocialMediaField;