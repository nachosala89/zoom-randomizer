class V1::MeetingsController < ApplicationController
  before_action :set_meeting, only: %i[ show edit update destroy reset ]
  skip_before_action :verify_authenticity_token

  # GET /meetings or /meetings.json
  def index
    @meetings = Meeting.all
    render json: @meetings
  end

  # GET /meetings/1 or /meetings/1.json
  def show
    render json: @meeting
  end

  # GET /meetings/new
  def new
    @meeting = Meeting.new
  end

  # POST /meetings or /meetings.json
  def create
    @meeting = Meeting.new
    if @meeting.save
      render json: {
        success: 'Meeting created succesfully',
        path: @meeting.encode_id
      }
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  def reset
    saved = true
    @users = @meeting.users.all
    @users.each do |user|
      user.selected = 0
      saved = false unless user.save
    end
    if saved
      render json: {
        success: 'users updated succesfully'
      }
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meetings/1 or /meetings/1.json
  def destroy
    @meeting.destroy

    respond_to do |format|
      format.html { redirect_to meetings_url, notice: "Meeting was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      id = Hashids.new("greater salt", 8).decode(params[:id]).try(:first)
      @meeting = Meeting.find(id)
    end
end
